var gulp = require('gulp');
var karma = require('karma').server;
var ts = require('gulp-typescript');
var typedoc = require("gulp-typedoc");

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
  var tsResult = gulp.src('src/*.ts')
    .pipe(ts({}));
  return tsResult.js.pipe(gulp.dest('js'));
});

gulp.task("typedoc", function() {
  return gulp.src(["src/**/*.ts"])
    .pipe(typedoc({
      module: "commonjs",
      target: "es5",
      out: "docs/",
      name: "fclass",
      includeDeclarations: true
    }));
});

gulp.task('default', ['typedoc', 'test']);
