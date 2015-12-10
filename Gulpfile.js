var concat, del, jade, gulp, sass, sourcemaps
var watch, webserver;

gulp = require('gulp');
del = require('del');
concat = require('gulp-continuous-concat');
sass = require('gulp-sass');
sourcemaps = require('gulp-sourcemaps');
webserver = require('gulp-webserver');
watch = require('gulp-watch');
jade = require('gulp-jade');

gulp.task('default', ['clean-public', 'copy-images', 'compile-scss', 'compile-jade']);
gulp.task('serve', ['default', 'webserver']);

gulp.task('clean-public', function() {
  return del([
    'public/**/*'
  ])
});

gulp.task('compile-jade', function() {
  gulp.src([
      'app/jade/**/*.jade',
      '!app/jade/layout.jade',
      '!app/jade/mixins/*.jade'
  ])
    .pipe(watch('app/jade/**/*.jade'))
    .pipe(jade())
    .pipe(gulp.dest('public/'));
});

gulp.task('compile-scss', function() {
  gulp.src([
      'app/stylesheets/**/*.scss',
      '!app/stylesheets/**/_*.scss'
    ])
    .pipe(watch('app/stylesheets/**/*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({ indentedSyntax: false, errLogToConsole: true }))
    .pipe(concat('application.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets'))
});

gulp.task('copy-images', function() {
  gulp.src(['app/images/**.{jpeg,jpg,gif,png}'])
    .pipe(watch('app/images/**.{jpeg,jpg,gif,png}'))
    .pipe(gulp.dest('public/images'))
});

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});
