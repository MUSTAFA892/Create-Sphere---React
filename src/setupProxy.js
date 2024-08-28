const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.elevenlabs.io',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // Remove '/api' prefix when making requests to the Eleven Labs API
            },
        })
    );
};
