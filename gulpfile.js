var gulp        = require('gulp');
var babel       = require('gulp-babel');
var browserify  = require('gulp-browserify');
var browserSync = require('browser-sync');

gulp.task('default', function() {

});

gulp.task('babel', function() {
  return gulp.src('js/CourseDetail.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('browserify', ['babel'], function() {

});

gulp.task('serve', ['babel'], function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
});
