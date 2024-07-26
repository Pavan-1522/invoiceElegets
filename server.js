const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/proxy', createProxyMiddleware({
    target: 'http://localhost', // This will be replaced dynamically
    changeOrigin: true,
    pathRewrite: (path, req) => {
        return path.replace('/proxy/', '/');
    },
    router: function (req) {
        const target = req.query.target;
        return target ? `http://${target}` : 'http://localhost';
    }
}));

app.listen(3000, () => {
    console.log('Proxy server running on port 3000');
});
