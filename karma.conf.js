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

// Local
const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    files: [
      'src/specs.ts',
    ],

    frameworks: [
      'mocha',
      'chai',
      'sinon',
    ],

    plugins: [
      'karma-webpack',
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-remap-istanbul',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
    ],

    mime: {
      'text/x-typescript': ['ts'],
    },

    logLevel: config.LOG_WARN,

    preprocessors: {
      './src/specs.ts': ['webpack', 'sourcemap'],
    },

    reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],

    browsers: ['PhantomJS'],

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only',
    },

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'text-summary' },
        { type: 'json', subdir: '.', file: 'coverage.json' },
      ],
    },

    remapIstanbulReporter: {
      src: 'coverage/coverage.json',
      reports: {
        html: 'coverage/html',
        lcovonly: 'coverage/lcov.info',
      },
      timeoutNotCreated: 2000,
      timeoutNoMoreFiles: 2000,
    },

    mochaReporter: {
      showDiff: true,
    },
  });
};
