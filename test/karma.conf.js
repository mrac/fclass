module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]
  });
};
