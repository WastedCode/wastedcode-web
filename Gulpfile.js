var jade, gulp, sass, sourcemaps, watch, webserver;

gulp = require('gulp');
sass = require('gulp-sass');
sourcemaps = require('gulp-sourcemaps');
webserver = require('gulp-webserver');
watch = require('gulp-watch');
jade = require('gulp-jade');

gulp.task('default', ['compile-sass', 'compile-scss', 'compile-jade']);
gulp.task('serve', ['default', 'webserver']);

gulp.task('compile-jade', function() {
  gulp.src('app/jade/**/*.jade')
    .pipe(watch('app/jade/**/*.jade'))
    .pipe(jade())
    .pipe(gulp.dest('public/'));
});

gulp.task('compile-sass', function() {
  gulp.src('app/stylesheets/**/*.sass')
    .pipe(watch('app/stylesheets/**/*.sass'))
    .pipe(sourcemaps.init())
    .pipe(sass({ indentedSyntax: true, errLogToConsole: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('compile-scss', function() {
  gulp.src('app/stylesheets/**/*.scss')
    .pipe(watch('app/stylesheets/**/*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({ indentedSyntax: false, errLogToConsole: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});
