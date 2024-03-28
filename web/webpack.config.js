const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirectory = path.resolve(__dirname, '../')
const { presets } = require(`${appDirectory}/babel.config.js`)

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.

const compileNodeModules = [
  // Add every react-native package that needs compiling
  'react-native-web-webview',
  'react-native-youtube-iframe',
  'react-native-progress',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`))

const babelLoaderConfiguration = {
  test: /\.(tsx|jsx|ts|js|web.tsx)?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.js'), // Entry path to your application
    path.resolve(appDirectory, 'App.tsx'), 
    path.resolve(appDirectory, 'src'), // If you have local components, add the path to their folder
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended 
      // to match React Native's packager, 
      // so we added this preset to our babel configuration file
      presets, 
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
  },
}

// This loader is used to handle SVG files and transforms them into React components.
const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
}

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
}

// This loader is used to handle HTML files and import them 
// as strings into JavaScript modules.
const htmlLoaderConfiguration = {
  test: /.html$/,
  use: {
    loader: 'html-loader',
  },
}

// This loader is used to handle font files and copy them to the output directory,
// preserving their original file names.
const fileLoaderConfiguration = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
      },
    },
  ],
}

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.js'),
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      htmlLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      fileLoaderConfiguration,
    ],
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web', // IMPORTANT
      '@rizna_team/rizna_components$': '@rizna_team/rizna_components/web', // IMPORTANT
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [
      '.web.js',
      '.js',
      '.web.ts',
      '.ts',
      '.web.jsx',
      '.jsx',
      '.web.tsx',
      '.tsx',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appDirectory, 'web/public/index.html'), // should write your path to index.html
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
}