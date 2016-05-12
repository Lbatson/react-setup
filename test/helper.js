const jsdom = require('jsdom');
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

// set globals for mocha that make access to document
global.document = doc;
global.window = win;
global.navigator = { userAgent: 'all' };

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) { continue; }
    if (key in global) { continue; }
    global[key] = window[key];
  }
}

// take all properties of the window object and also attach it to the mocha global object
propagateToGlobal(win);
