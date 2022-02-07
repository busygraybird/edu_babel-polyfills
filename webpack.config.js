import {fileURLToPath} from "url";
import {dirname, join} from "path";
import HTMLWebpackPlugin from 'html-webpack-plugin';
 import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env) => ({
    entry: join(__dirname, 'src', 'index.js'),
    output: {
        path: join(__dirname, 'build'),
        filename: 'index.js',
        clean: true,
        iife: false
    },
    module: {
        rules: [
            {
                test: /\.(js)x?$/,
                use: 'babel-loader',
                resolve: {
                    fullySpecified: false,
                }
            },
            {
                test: /\.(s?css)$/i,
                use: [
                    !env.production ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: !env.production ? '[name]__[local]' : '[hash:base64]',
                                exportLocalsConvention: 'camelCase',
                            },
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                presets: ['postcss-preset-env'],
                            },
                        },
                    },
                    'sass-loader',
                ],
                include: /\.module\.s?css$/,
            },
            {
                test: /\.(s?css)$/i,
                use: [
                    !env.production ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                presets: ['postcss-preset-env'],
                            },
                        },
                    },
                    'sass-loader',
                ],
                exclude: /\.module\.s?css$/,
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    // devtool: !env.production ? 'inline-source-map' : 'source-map',
    devtool: false,
    devServer: {
        static: 'build',
        port: 3000,
        hot: true,
    },
    mode: !env.production ? 'development' : 'production',
})
