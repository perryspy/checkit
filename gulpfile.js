var gulp = require('gulp'),
  gutil   = require('gulp-util'),
  plugins = require('gulp-load-plugins')();

gulp.task('default', ['build-js', 'build-css', 'watch']);

gulp.task('build-js', function() {
  return gulp.src('client/js/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.sourcemaps.init())  // process the original sources
      .pipe(plugins.concat('scripts.min.js'))
      .pipe(gutil.env.type === 'production' ? plugins.ugilify() : gutil.noop())
    .pipe(plugins.sourcemaps.write())  // add the map to modified source
    .pipe(gulp.dest('client'));
});

gulp.task('build-css', function() {
  return gulp.src('client/css/**/*.css')
    .pipe(plugins.sourcemaps.init())  // process the original sources
      .pipe(plugins.concatCss('main.min.css'))
      .pipe(gutil.env.type === 'production' ? plugins.cssmin() : gutil.noop())
    .pipe(plugins.sourcemaps.write())  // add the map to modified source
    .pipe(gulp.dest('client')).on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch('client/js/**/*.js', ['build-js']);
  gulp.watch('client/css/**/*.css', ['build-css']);
});