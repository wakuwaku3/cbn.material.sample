const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const app = {
  // メインとなるファイル（エントリーポイント）
  entry: ['./assets/ts/entrypoint.ts'],
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
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          {
            loader: 'style-loader' // inject CSS to page
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップを有効にする
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require('precss'), require('autoprefixer')];
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      // ソースマップファイルの処理
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  // ソースマップを有効に
  devtool: 'source-map'
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
