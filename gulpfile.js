'use strict';
var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    src = {},
    templates,
    through2 = require('through2'),
    $ = require('gulp-load-plugins')();

function cleanCache(cacheName) {
    /*jslint unparam:true*/
    return lazypipe().pipe(through2.obj, function (file, enc, cb) {
        if (file.event === 'unlink') {
            delete $.cached.caches[cacheName][file.path];
            $.remember.forget(cacheName, file.path);
        } else {
            this.push(file);
        }
        cb();
    });
}

src.templates = 'src/**/*.html';
templates = lazypipe()
    .pipe($.debug, {title: 'from pipe', minimal: false})
    .pipe($.cached, 'templates')
    .pipe($.remember, 'templates')
    .pipe($.debug, {title: 'after remember', minimal: false})
    .pipe($.angularTemplatecache)
    .pipe(gulp.dest, 'dist/');

gulp.task('templates', function () {
    return gulp.src(src.templates).pipe(templates());
});

gulp.task('default', ['templates'], function () {
    $.watch(src.templates, $.batch(function (events, done) {
        events
            .pipe(cleanCache('templates').pipe(templates)())
            .pipe($.util.buffer(function () {
                done();
            }));
    }));
});
