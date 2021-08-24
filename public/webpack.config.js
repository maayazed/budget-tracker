const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
    entry: {

    },
    output: {

    },
    mode: 'development',
    module: {
        rules: [
            {
                test: '',
                exclude: '',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: []
                    },
                },
            },
        ],
    },
    plugins: [

    ]
}

module.exports = config;