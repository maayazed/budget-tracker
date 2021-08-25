const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
    entry: {
        app: '/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new WebpackPwaManifest({
            fingerprints: true,
            name: 'Budget App',
            short_name: 'Budgeting',
            description: 'An application that allows you to add and subtract expenses that is viewed on a graph.',
            background_color: '#40FFA7',
            theme_color: '#6E6E6E',
            'theme_color': '#6E6E6E',
            start_url: '/',
            icons: [
                {
                    src: path.resolve('icons/icon-192x192.png'),
                    sizes: [192, 512],
                },
            ],
        }),
    ],
};

module.exports = config;