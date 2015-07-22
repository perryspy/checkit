var gulp = require('gulp'),
  gutil   = require('gulp-util'),
  plugins = require('gulp-load-plugins')();

var exec = require('child_process').exec;

gulp.task('default', ['build-js', 'build-css', 'server', 'watch']);

gulp.task('jslint' , function() {
  return gulp.src('client/js/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', ['jslint'], function() {
  return gulp.src('client/js/**/*.js')
    .pipe(plugins.sourcemaps.init())  // process the original sources
      .pipe(plugins.concat('scripts.min.js'))
      .pipe(gutil.env.type === 'production' ? plugins.ugilify() : gutil.noop())
    .pipe(plugins.sourcemaps.write())  // add the map to modified source
    .pipe(gulp.dest('client'));
});

gulp.task('csslint', function() {
  return gulp.src('client/css/**/*.css')
    .pipe(plugins.csslint())
    .pipe(plugins.csslint.reporter());
});

gulp.task('build-css', ['csslint'], function() {
  return gulp.src('client/css/**/*.css')
    .pipe(plugins.sourcemaps.init())  // process the original sources
      .pipe(plugins.concatCss('main.min.css'))
      .pipe(gutil.env.type === 'production' ? plugins.cssmin() : gutil.noop())
    .pipe(plugins.sourcemaps.write())  // add the map to modified source
    .pipe(gulp.dest('client')).on('error', gutil.log);
});

gulp.task('lint', ['csslint', 'jslint']);

gulp.task('watch', function() {
  gulp.watch('client/js/**/*.js', ['build-js']);
  gulp.watch('client/css/**/*.css', ['build-css']);
});

gulp.task('server', function (cb) {
  exec('mongod', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });

  exec('nodemon server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });

  var port = process.env.PORT || 1337;
  console.log('App listening on port ' + port);
});

