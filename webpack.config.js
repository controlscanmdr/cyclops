/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTSCheckerPlugin = require('fork-ts-checker-webpack-plugin');

/**
 * Current running environment.
 * @type {string}
 */
const ENV = process.env.NODE_ENV || 'development';

/**
 * If webpack is being run in a production environment.
 * @type {boolean}
 */
const PRODUCTION = ENV === 'production';

/**
 * Banner placed at the top of the compiled code.
 * @type {string}
 */
const BANNER =
`The contents of this file are subject to the CYPHON Proprietary Non-
Commercial Registered User Use License Agreement (the "Agreement”). You
may not use this file except in compliance with the Agreement, a copy
of which may be found at https://github.com/dunbarcyber/cyclops/. The
developer of the CYPHON technology and platform is Dunbar Security
Systems, Inc.

The CYPHON technology or platform are distributed under the Agreement on
an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
implied. See the Agreement for specific terms.

Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.

Contributor/Change Made By: ________________. [Only apply if changes
are made]`;

const CSS_LOADER = {
  loader: 'css-loader',
  options: {
    // Use minimize and source map in production.
    minimize: PRODUCTION,
    sourceMap: PRODUCTION,
  },
};

const JS_SOURCEMAP_RULE = {
  test: /\.js$/,
  enforce: 'pre',
  loader: 'source-map-loader',
};

const TS_SOURCEMAP_RULE = {
  test: /\.tsx?$/,
  enforce: 'pre',
  loader: 'source-map-loader',
};

const CSS_RULE = {
  test: /\.css$/,
  use: [
    'style-loader',
    CSS_LOADER,
  ],
};

const TYPESCRIPT_RULE = {
  test: /\.tsx?$/,
  include: path.resolve(__dirname, 'src'),
  loader: 'ts-loader',
  options: {
    transpileOnly: true
  }
};

const SCSS_RULE = {
  test: /\.scss$/,
  include: path.resolve(__dirname, 'src'),
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      CSS_LOADER,
      'sass-loader',
    ],
  }),
};

const RULES = [
  JS_SOURCEMAP_RULE,
  TS_SOURCEMAP_RULE,
  CSS_RULE,
  TYPESCRIPT_RULE,
  SCSS_RULE,
];

const BASE_PLUGINS = [
  new ExtractTextPlugin('cyclops.css'),
  new ForkTSCheckerPlugin(),
  new webpack.BannerPlugin(BANNER),
];

const PRODUCTION_PLUGINS = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
  }),
  new CleanWebpackPlugin(['dist']),
];

const PLUGINS = {
  development: () => BASE_PLUGINS,
  production: () => BASE_PLUGINS.concat(PRODUCTION_PLUGINS),
}[ENV]();

module.exports = {
  context: __dirname,

  entry: [
    'core-js/shim',
    './src/main.ts'
  ],

  output: {
    filename: 'cyclops.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.json',
    ],
    alias: {
      '~': path.resolve(__dirname, 'src/app/'),
    },
  },

  devServer: {
    stats: "minimal",
    compress: true,
  },

  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',

  module: {
    rules: RULES,
    noParse: /(mapbox-gl)\.js$/,
  },

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    'mapboxgl': 'mapboxgl',
  },

  plugins: PLUGINS,
};
