// Polyfill for setImmediate in browser environment
// setImmediate is a Node.js API that doesn't exist in browsers
// This provides a fallback using setTimeout

if (typeof setImmediate === 'undefined') {
  setImmediate = function(callback, ...args) {
    return setTimeout(() => callback.apply(this, args), 0);
  };

  clearImmediate = function(id) {
    return clearTimeout(id);
  };
}

module.exports = setImmediate;
