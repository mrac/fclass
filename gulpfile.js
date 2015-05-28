var gulp = require('gulp');
var karma = require('karma').server;
var ts = require('gulp-typescript');

gulp.task('test', ['tsc'], function() {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  });
});

gulp.task('tdd', ['tsc'], function (done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js'
  }, done);
});

gulp.task('tsc', function () {
  var tsResult = gulp.src('*.ts')
    .pipe(ts({}));
  return tsResult.js.pipe(gulp.dest('js'));
});

gulp.task('default', ['test']);
