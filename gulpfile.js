var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    server = require('gulp-live-server'),
    browserify = require('gulp-browserify'),
    rename = require("gulp-rename");

gulp.task('default', ['browserify','serve', 'watch']);


gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify']);
});

gulp.task('serve', function() {
    var serve = server.static('./', 3000);
    serve.start();
    gulp.watch('app/js/**/*.js', function (file) {
        server.notify.apply(serve, [file]);
    });
    gulp.watch('./**/*.html', function (file) {
        server.notify.apply(serve, [file]);
    });

});

gulp.task('browserify', function(){
    return gulp.src(['app/app.js'])
        .pipe(browserify())
        //.pipe(uglify({ mangle: false }))
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest('public/js/'));
});