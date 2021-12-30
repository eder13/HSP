var path = require('path');
var { DefinePlugin, EnvironmentPlugin } = require('webpack');
var dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    node: {
        fs: 'empty'
    },

    // TODO PROD: Remove this resolve
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },

    entry: {
        app: [
            '@babel/polyfill',
            'react-hot-loader/webpack', // TODO PROD: Remove this
            'webpack-dev-server/client?http://localhost:8080', // TODO PROD: Remove That
            'webpack/hot/only-dev-server', // TODO PROD: Remove That also
            './src/main/frontend/index.js'
        ]
    },
    // TODO PROD: Switch to commented code
    mode: 'development', // mode: 'production',
    devtool: 'eval-source-map', // Just remove this line entirely
    cache: true, // cache: false,
    output: {
        path: path.resolve(__dirname, './src/main/resources/static/built/'),
        filename: 'bundle.js',
        publicPath: '/built/'
    },

    // TODO PROD: Uncomment this
    /*
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
            new CssMinimizerPlugin(),
        ],
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    */

    // TODO PROD: Remove devServer property
    devServer: {
        hot: true,
        contentBase: [path.resolve(__dirname, '.'), path.resolve(__dirname, './src/main/resources/static/built')],
        proxy: {
            '/': {
                target: {
                    host: 'localhost',
                    protocol: 'http:',
                    port: 8081
                }
            },
            ignorePath: true,
            changeOrigin: true,
            secure: false
        },
        publicPath: '/built/',
        port: 8080,
        host: 'localhost',
        compress: true
        /*         client: {
            overlay: true
        } */
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                exclude: /(node_modules)/,
                test: /\.css$/,
                use: ['postcss-loader']
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: 'built/images/',
                            outputPath: 'images',
                            useRelativePath: false
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2
                                }),
                                require('imagemin-svgo')({
                                    plugins: [{ removeTitle: true }, { convertPathData: false }]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                resolve: {
                    extensions: ['.js', '.jsx']
                }
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed)
        }),
        // TODO PROD: Switch to commented code
        new EnvironmentPlugin({
            NODE_ENV: 'development' // NODE_ENV: 'production'
        })
    ],
    target: 'web'
};
