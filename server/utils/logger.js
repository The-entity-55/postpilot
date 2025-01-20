const logger = {
  info: (message, meta = {}) => {
    console.log('[INFO]', message, meta);
  },

  debug: (message, meta = {}) => {
    console.log('[DEBUG]', message, meta);
  },

  error: (message, meta = {}) => {
    console.error('[ERROR]', message, meta);
  },

  warn: (message, meta = {}) => {
    console.warn('[WARN]', message, meta);
  }
};

module.exports = logger;