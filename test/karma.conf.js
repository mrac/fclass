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
      'bower_components/json3/lib/json3.js',
      'js/*.js',
      'test/*-spec.js'
    ]
  });
};
