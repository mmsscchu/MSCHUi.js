const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: "./src/index.ts", // 번들링 시작 위치
    output: {
        path: path.join(__dirname, "/dist"), // 번들 결과물 위치
        filename: "bundle.js",
        library : "MSCHUi",// 라이브러리 설정 방법
        libraryTarget : "umd",// 라이브러리 내보내기 설정
        libraryExport : "default",
    },
    module: {
        rules: [
            {
                test: /[\.js]$/, // .js 에 한하여 babel-loader를 이용하여 transpiling
                exclude: /node_module/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.ts$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
                exclude: /node_module/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/i, // 모듈 파일 제외 설정
                use: ['style-loader', 'css-loader'],
            },
            // CSS Module ([filename].module.css)
            {
                test: /\.module\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            }
        ],
    },
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
        extensions: [".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // 템플릿 위치
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash:8].css',
            chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
        }),
    ],
    devServer: {
        host: "localhost", // live-server host 및 port
        port: 5500,
    },
    mode: "development", // 번들링 모드 development / production
};