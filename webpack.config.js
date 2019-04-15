/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is ControlScan, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 ControlScan, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/** Current running environment. */
const ENV = process.env.NODE_ENV || 'development';

/** If webpack is being run in a production environment. */
const PRODUCTION = ENV === 'production';

/** If webpack is being run in a test environment. */
const TESTING = ENV === 'test';

/** If webpack is being run in a development environment. */
const DEVELOPMENT = ENV === 'development';

const BANNER =
`The contents of this file are subject to the CYPHON Proprietary Non-
Commercial Registered User Use License Agreement (the "Agreement”). You
may not use this file except in compliance with the Agreement, a copy
of which may be found at https://github.com/dunbarcyber/cyclops/. The
developer of the CYPHON technology and platform is ControlScan, Inc.

The CYPHON technology or platform are distributed under the Agreement on
an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
implied. See the Agreement for specific terms.

Copyright (C) 2017 ControlScan, Inc. All Rights Reserved.

Contributor/Change Made By: ________________. [Only apply if changes
are made]`;

const CSS_LOADER = {
  loader: 'css-loader',
  options: {
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

const TSLINT_RULE = {
  test: /\.tsx?$/,
  enforce: 'pre',
  loader: 'tslint-loader',
};

const CSS_RULE = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
  ],
};

const TYPESCRIPT_RULE = {
  test: /\.tsx?$/,
  include: path.resolve(__dirname, 'src'),
  use: ['awesome-typescript-loader'],
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

const COVERAGE_RULE = {
  test: /\.tsx?$/,
  enforce: 'post',
  include: path.resolve(__dirname, 'src/app'),
  exclude: /\.spec\.tsx?$/,
  loader: 'istanbul-instrumenter-loader',
};

const BASE_RULES = [
  TSLINT_RULE,
  JS_SOURCEMAP_RULE,
  TS_SOURCEMAP_RULE,
  CSS_RULE,
  TYPESCRIPT_RULE,
  SCSS_RULE,
];

const TEST_RULES = [
  COVERAGE_RULE,
];

const RULES = TESTING ? BASE_RULES.concat(TEST_RULES) : BASE_RULES;

const BASE_PLUGINS = [
  new ExtractTextPlugin('cyclops.css'),
  new webpack.BannerPlugin(BANNER),
];

const TEST_PLUGINS = [
  new webpack.SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(tsx?|js)($|\?)/i, // process .js and .ts files only
  }),
];

const PRODUCTION_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
];

const PLUGINS = {
  development: () => BASE_PLUGINS,
  production: () => BASE_PLUGINS.concat(PRODUCTION_PLUGINS),
  test: () => BASE_PLUGINS.concat(TEST_PLUGINS),
}[ENV]();

module.exports = {
  context: __dirname,

  entry: './src/main.ts',

  output: TESTING ? undefined : {
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

  devtool: TESTING || DEVELOPMENT ? 'inline-source-map' : 'source-map',

  module: {
    rules: RULES,
    noParse: /(mapbox-gl)\.js$/,
  },

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    mapboxgl: 'mapboxgl',
  },

  plugins: PLUGINS,
};
