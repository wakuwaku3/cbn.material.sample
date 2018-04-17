const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const app = {
    // メインとなるファイル（エントリーポイント）
    entry: ['./src/entrypoint.ts'],
    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: `${__dirname}/wwwroot`,
        // 出力ファイル名
        filename: 'bundle.js',
        library: 'bundle'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        rules: [
            {
                // 拡張子 .ts もしくは .tsx の場合
                test: /\.tsx?$/,
                exclude: /node_modules/,
                // TypeScript をコンパイルする
                use: 'awesome-typescript-loader'
            },
            { test: /\.css$/, use: 'css-loader/locals' },
            // ソースマップファイルの処理
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.(jpg|png)$/,
                loaders: 'url-loader'
            }
        ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    }
};

if (process.env.NODE_ENV !== 'production') {
    app.devtool = 'source-map';
} else {
    app.plugins.push(
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        })
    );
}
module.exports = [app];
