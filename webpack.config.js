import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
    mode: 'development',
    entry: [`${__dirname}/src/index.js`],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public_html/assets'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public_html'),
            watch: true,
        },
        devMiddleware: {
            publicPath: '/assets/',
        },
        port: 3000,
        open: true,
        client: {
            overlay: {},
        },
        historyApiFallback: {
            index: 'index.html',
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
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
                                        localIdentName:
                                            '[local]_[hash:base64:8]',
                                    },
                                },
                            },
                            {
                                loader: 'sass-loader',
                            },
                        ],
                    },
                    {
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            'css-loader',
                            'sass-loader',
                        ],
                    },
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: './style.css',
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        }),
    ],
};
