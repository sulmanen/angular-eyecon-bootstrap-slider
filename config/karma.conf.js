// Karma configuration

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      'app/js/vendor/angular.js',
      'app/js/angular/app.js',
      'app/js/angular/**/*.js',
      'test/vendor/angular-mocks.js',
      'test/spec/angular/**/*.js'
    ],

    // list of files to exclude
    exclude: [

    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots', 'coverage'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    // Code Coverage options. report type available:
    // - html (default)
    // - lcov (lcov and html)
    // - lcovonly
    // - text (standard output)
    // - text-summary (standard output)
    // - cobertura (xml format supported by Jenkins)
    coverageReporter: {
      // cf. http://gotwarlost.github.io/istanbul/public/apidocs/
      type: 'html',
      dir: 'test/coverage'
    },

    preprocessors: {
      '**/app/js/angular/**/*.js': ['coverage']
    },

    // plugins to load
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ]

  });
};
