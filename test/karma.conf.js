module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ],
    files: [
      'bower_components/es5-shim/es5-shim.js',
      'js/*.js',
      'test/*-spec.js'
    ]
  });
};
