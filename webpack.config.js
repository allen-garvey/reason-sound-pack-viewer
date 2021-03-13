const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: [
            `${__dirname}/src/index.js`,
        ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public_html/assets'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'public_html'),
        publicPath: '/assets/',
        port: 3000,
        open: true,
        overlay: true,
        historyApiFallback: {
            index: 'index.html'
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                oneOf: [
                    // this matches `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    esModule: false,
                                    modules: {
                                        localIdentName: '[local]_[hash:base64:8]',
                                    },
                                }
                            },
                            {
                                loader: 'sass-loader',
                            },
                        ]
                    },
                    {
                        use: [
                            'vue-style-loader',
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            'css-loader',
                            'sass-loader',
                        ]
                    },
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: './style.css',
        }),
    ],
};