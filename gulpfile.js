var gulp = require('gulp');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

gulp.task('clean', function (cb) {
    gulp.src('src/express-quicklee.min.js')
        .pipe(clean());
});

gulp.task('compress', function() {
    gulp.src('src/express-quicklee.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src'));
});