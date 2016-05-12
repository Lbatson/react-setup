function noop() {
  return null;
}

// Add extensions to exclude from test compilation
require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
