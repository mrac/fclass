var gulp = require('gulp');
var karma = require('karma').server;
var typescript = require('gulp-typescript');
var typedoc = require("gulp-typedoc");
var sourcemaps = require('gulp-sourcemaps');

var karmaConfig = '/karma.conf.js';


gulp.task('default', ['typedoc', 'test']);


gulp.task('test', ['tsc'], function () {
    karma.start({
        configFile: __dirname + karmaConfig,
        singleRun: true
    });
});


gulp.task('tdd', ['tsc'], function (done) {
    karma.start({
        configFile: __dirname + karmaConfig
    }, done);
});


gulp.task('tsc', function () {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript({
            sortOutput: true
        }));
    return tsResult.js
        .pipe(sourcemaps.write('.'), {
            includeContent: false
        })
        .pipe(gulp.dest('js'));
});


gulp.task("typedoc", function () {
    return gulp.src(["src/**/*.ts"])
        .pipe(typedoc({
            module: "commonjs",
            target: "es5",
            out: "docs/",
            name: "fclass",
            theme: "minimal",
            includeDeclarations: true
        }));
});

