var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    src = {},
    templates,
    $ = require('gulp-load-plugins')();

src.templates = 'src/**/*.html';
templates = lazypipe()
    .pipe($.debug, {title: 'from pipe', minimal: false})
    .pipe($.angularTemplatecache)
    .pipe(gulp.dest, 'dist/');

gulp.task('templates', function () {
    return gulp.src(src.templates).pipe(templates());
});

gulp.task('default', ['templates'], function () {
    $.watch(src.templates, $.batch(function (events, done) {
        events
            .pipe(templates())
            .pipe($.util.buffer(function () {
                done();
            }));
    }));
});
