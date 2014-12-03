var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var del = require('del');
var concat = require('gulp-concat');
var order = require('gulp-order');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var smushit = require('gulp-smushit');

gulp.task('sass', function () {
    return gulp.src('scss/main.scss')
    	.pipe(sass())
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('css'));
});

gulp.task('clean', function (cb) {
	del(['css/**'], cb);
});

gulp.task('minify', function(){
	return gulp.src('js/src/**/*.js')
		.pipe(order(['js/src/vendor/jquery-1.11.1.min.js',
			'js/src/**/*.js'
		], {base: './'}))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('js/dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/dist'));
	
});

gulp.task('lint', function() {
  return gulp.src(['js/src/**/*.js', '!js/src/vendor/*.js']) 
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('smush', function () {
    return gulp.src('img/*.{jpg,png}')
        .pipe(smushit())
        .pipe(gulp.dest('img'));
});


gulp.task('default', ['sass'], function(){
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('js/src/**/*.js', ['lint', 'minify']);
});

gulp.task('build', ['clean', 'sass', 'smush', 'lint', 'minify']);
