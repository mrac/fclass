var gulp = require('gulp');
var karma = require('karma').server;

gulp.task('test', function() {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  });
});

gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js'
  }, done);
});

gulp.task('default', ['test']);

