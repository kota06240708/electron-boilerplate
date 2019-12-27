const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// プラグインのインポート
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin')

// プロジェクト直下のディレクトリを監視させる
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
  path: './'
})

// メインプロセス
/** 補完が効きます！ */
/** @type import('webpack').Configuration */
const main = {
  target: 'electron-main',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.ts']
  },
  entry: './src/script/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        enforce: 'pre',
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          formatter: require('eslint/lib/cli-engine/formatters/stylish')
        }
      }
    ]
  },
  // プラグイン起動
  plugins: [
    ElectronReloadWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devtool: 'inline-source-map'
}

// レンダラープロセス
/** @type import('webpack').Configuration */
const app = {
  target: 'electron-renderer',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  entry: './src/script/renderer.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        enforce: 'pre',
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          formatter: require('eslint/lib/cli-engine/formatters/stylish')
        }
      }
    ]
  },
  plugins: [ElectronReloadWebpackPlugin()],
  devtool: 'inline-source-map'
}

module.exports = [main, app]
