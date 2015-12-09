var gulp, sass, sourcemaps;

gulp = require('gulp');
sass = require('gulp-sass');
sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['compile-sass', 'compile-scss']);

gulp.task('compile-sass', function() {
  gulp.src('stylesheets/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ indentedSyntax: true, errLogToConsole: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('compile-scss', function() {
  gulp.src('stylesheets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ indentedSyntax: false, errLogToConsole: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets'));
});
