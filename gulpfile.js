var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var del = require('del');

gulp.task('clean', function (cb) {
  del(['css/**'], cb);
});

gulp.task('sass', function () {
    return gulp.src('scss/main.scss')
        .pipe(sass({sourcemap: true, sourcemapPath: '../scss'}))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('css'));
});

