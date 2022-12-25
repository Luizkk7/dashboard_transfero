const env = Object.freeze({
  API_URL: import.meta.env.VITE_API_URL || '',
  TOKEN_SISTEMA: import.meta.env.VITE_TOKEN_SISTEMA || ''
});

export default env;
