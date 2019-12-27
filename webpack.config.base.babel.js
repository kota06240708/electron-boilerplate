import conf from './system/config'
import glob from 'glob'

const { src, jsDir, jsxDir, isLocal } = conf()

const entriesTs = {}
const entriesTsx = {}

glob
  .sync(`./${src}/**/${jsDir}`, {
    ignore: `./${src}/**/_${jsDir}`
  })
  .map(file => {
    const regEx = new RegExp(`./${src}/`)
    const key = file.replace(regEx, '')
    const jsKey = key.replace('ts', 'js')

    entriesTs[jsKey] = file
  })

glob
  .sync(`./${src}/**/${jsxDir}`, { ignore: `./${src}/**/_${jsxDir}` })
  .map(file => {
    const regEx = new RegExp(`./${src}/`)
    const key = file.replace(regEx, '')
    const jsKey = key.replace('tsx', 'js')
    entriesTsx[jsKey] = isLocal
      ? [file, 'webpack/hot/dev-server', 'webpack-hot-middleware/client']
      : file
  })

const getEntry = Object.assign(entriesTs, entriesTsx) // マージ

export default {
  entry: getEntry,

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(vert|frag|glsl)$/i,
        use: [{ loader: 'raw-loader' }, { loader: 'glslify-loader' }],
        exclude: /node_modules/
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
