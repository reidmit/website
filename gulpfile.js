const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const foreach = require('gulp-foreach');
const markdown = require('markdown-it');
const data = require('gulp-data');
const frontMatter = require('gulp-front-matter');
const del = require('del');
const highlightJs = require('highlight.js');
const browserSync = require('browser-sync').create();
const markdownToJson = require('gulp-markdown-to-json');

const outputDir = './docs/';
const tempDir = './temp/';

const renderMarkdown = input => {
    const md = require('markdown-it')();
    return md.render(input);
}

gulp.task('build-scss', () => {
    gulp.src('*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(outputDir));
});

gulp.task('build-pug', () => {
    gulp.src('*.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true,
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('posts:markdown-to-json', () => {
    gulp.src('posts/*.md')
        .pipe(markdownToJson(renderMarkdown))
        .pipe(gulp.dest(tempDir + '/posts'));
});

gulp.task('posts:json-to-html', () => {
    gulp.src(tempDir + '/posts/*.json')
        .pipe(foreach((stream, file) => {
            return gulp.src('templates/post.pug')
                .pipe(data(require(file.path)))
                .pipe(pug({
                    doctype: 'html',
                    pretty: true,
                }))
                .pipe(gulp.dest(outputDir));
        }));
});

gulp.task('build-posts', [
    'posts:markdown-to-json',
    'posts:json-to-html'
]);

gulp.task('build', [
    'build-scss',
    'build-pug',
    'build-markdown',
]);

gulp.task('clean', () => del([
    `${outputDir}**/*`,
    `!${outputDir}CNAME`,
    `!${outputDir}static`,
    `!${outputDir}static/**/*`,
]));

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: outputDir
        }
    });
});

gulp.task('default', ['build', 'browser-sync'], () => {
    gulp.watch('*.scss', [ 'build-scss' ]);
    gulp.watch('*.pug', [ 'build-pug' ]);
    gulp.watch('posts/*md', [ 'build-markdown' ]);
    gulp.watch(outputDir + '/*').on('change', browserSync.reload);
});
