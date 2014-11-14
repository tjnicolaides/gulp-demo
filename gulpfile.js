var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var order = require("gulp-order");
var smushit = require('gulp-smushit');
var jshint = require('gulp-jshint');

// Concat & Minify JS
gulp.task('minify', function(){
  return gulp.src('js/src/**/*.js')
  	.pipe(order([
        'js/src/vendor/jquery-1.11.1.min.js',
        'js/src/**/*.js'
    ], { base: './' }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js/dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/dist'));
});

gulp.task('clean', function (cb) {
  del(['css/**'], cb);
});

gulp.task('sass', function () {
    return gulp.src('scss/main.scss')
        .pipe(sass({sourcemap: true, sourcemapPath: '../scss'}))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('css'));
});

gulp.task('smush', function () {
    return gulp.src('img/*.{jpg,png}')
        .pipe(smushit())
        .pipe(gulp.dest('img'));
});

gulp.task('lint', function() {
  return gulp.src(['js/src/**/*.js', '!js/src/vendor/*.js']) 
  	// lint all js files but what's in the vendor dir
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['sass'], function () {
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch('js/src/**/*.js', ['lint', 'minify']);
});

gulp.task('build', ['clean', 'sass', 'smush', 'lint', 'minify']);
