module.exports = function (config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],
        files: [
            'bower_components/es5-shim/es5-shim.js',
            'bower_components/json3/lib/json3.js',
            'bower_components/array.prototype.find/index.js',
            'bower_components/Array.prototype.findIndex/index.js',
            'js/*.js',
            'test/*-spec.js'
        ]
    });
};
