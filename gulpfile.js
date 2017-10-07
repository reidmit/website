const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

gulp.task('build-css', () => {
  gulp.src('themes/rm/**/*.scss')
    .pipe(plumber())
    .pipe(sass({

    }))
    .pipe(autoprefixer({
      browsers: ['last 10 versions']
    }))
    .pipe(gulp.dest('static'));
});

gulp.task('watch', ['build-css'], () => {
  gulp.watch('themes/rm/**/*.scss', ['build-css']);
});

gulp.task('default', ['watch']);
