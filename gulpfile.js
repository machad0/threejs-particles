const gulp = require('gulp'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      connect = require('gulp-connect');

gulp.task('webserver', () => {
    connect.server({
        livereload: true
    });
})
gulp.task('babel', () => {
    return gulp.src([
	    'js/*.js'
    ])
	.pipe(babel({
    presets: ['es2015']
	}))
	.pipe(gulp.dest('dist'))
	.pipe(rename('build.js'))
});

gulp.watch([
    'lib/*.js',
    'js/*.js'
], ['babel']);

gulp.task('default', [
    'babel',
    'webserver'
]);
