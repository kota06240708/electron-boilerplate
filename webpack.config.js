const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin')

// プロジェクト直下のディレクトリを監視させる
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
  path: './'
})

const pluginsMain = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

const pluginsRenderer = [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

if (process.env.NODE_ENV !== 'production') {
  pluginsMain.push(ElectronReloadWebpackPlugin())
  pluginsRenderer.push(ElectronReloadWebpackPlugin())
}

// メインプロセス
const main = {
  target: 'electron-main',
  mode:
    process.env.NODE_ENV === 'production'
      ? process.env.NODE_ENV
      : 'development',
  resolve: {
    extensions: ['.js', '.ts']
  },
  node: {
    __dirname: false,
    __filename: false
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
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }
    ]
  },
  plugins: pluginsMain,
  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  }
}

// レンダラープロセス
const app = {
  target: 'electron-renderer',
  mode:
    process.env.NODE_ENV === 'production'
      ? process.env.NODE_ENV
      : 'development',
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }
    ]
  },
  plugins: pluginsRenderer,
  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}

module.exports = [app, main]
