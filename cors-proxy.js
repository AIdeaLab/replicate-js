"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
// Configuration
const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
const appendAuthHeaders = (proxyReq) => {
    proxyReq.setHeader('Authorization', `Token ${REPLICATE_TOKEN}`);
};
const onProxyRes = (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Headers'] = '*';
    delete proxyRes.headers['content-type'];
};
const app = (0, express_1.default)();
app.use('/api/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    router: (req) => req.originalUrl.replace(/.*https?:\/\//, 'https://'),
    changeOrigin: true,
    pathRewrite: { '.*': '' },
    onProxyReq: appendAuthHeaders,
    onProxyRes: onProxyRes
}));
app.listen(3000, () => {
    console.log('Proxy Started');
    if (process.send) {
        process.send("ready");
    }
});
