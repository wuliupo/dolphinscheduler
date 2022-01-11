const path = require('path');
const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                vue: 'Vue',
                _: 'lodash',
                jQuery: "jquery/dist/jquery.min.js",
                $: "jquery/dist/jquery.min.js",
            }),
        ],
        resolve: {
            alias: {
                // @/conf/
                '@': path.join(__dirname, 'src/js'),
                // ~/external/config
                '~': path.join(__dirname, 'src/lib'),
            },
        },
    },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/dolphinscheduler': {
                timeout: 1800000,
                target: 'http://127.0.0.1:12345',
                changeOrigin: true
            }
        },
        historyApiFallback: {
            rewrites: [
                {
                    from: /./,
                    to: '/index.html',
                },
            ],
        },
    },
    publicPath: process.env.PUBLIC_PATH || '/',
    productionSourceMap: false,
};
