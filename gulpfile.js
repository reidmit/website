const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const outputDir = './docs/';

gulp.task('build-css', () => {
    gulp.src('*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(outputDir));
});

gulp.task('build-html', () => {
    gulp.src('*.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true,
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('build', [
    'build-css',
    'build-html'
]);

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: outputDir
        }
    });
});

gulp.task('default', ['build', 'browser-sync'], () => {
    gulp.watch('*.scss', [ 'build-css' ]);
    gulp.watch('*.pug', [ 'build-html' ]);
    gulp.watch(outputDir + '/*').on('change', browserSync.reload);
});
