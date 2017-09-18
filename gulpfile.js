const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const foreach = require('gulp-foreach');
const plumber = require('gulp-plumber');
const data = require('gulp-data');
const rename = require('gulp-rename');
const markdownToJson = require('gulp-markdown-to-json');
const markdown = require('markdown-it');
const del = require('del');
const hljs = require('highlight.js');
const browserSync = require('browser-sync').create();

const outputDir = './docs';
const tempDir = './temp';

const renderMarkdown = input => markdown({
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (_) {}
        }

        return '';
    }
}).render(input);

gulp.task('build-scss', () => {
    return gulp.src('*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(outputDir));
});

gulp.task('build-pages', () => {
    return gulp.src('*.pug')
        .pipe(plumber())
        .pipe(data(() => {
            const d = {
                posts: []
            };
            fs.readdirSync(tempDir + '/posts').forEach(file => {
                d.posts.push(require(tempDir + '/posts/' + file));
            });
            return d;
        }))
        .pipe(pug({
            doctype: 'html',
            pretty: true,
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('posts:markdown-to-json', () => {
    return gulp.src('posts/*.md')
        .pipe(markdownToJson(renderMarkdown))
        .pipe(gulp.dest(tempDir + '/posts'));
});

gulp.task('posts:json-to-html', ['posts:markdown-to-json'], () => {
    return gulp.src(tempDir + '/posts/*.json')
        .pipe(foreach((stream, file) => {
            return gulp.src('templates/post.pug')
                .pipe(data(() => require(file.path)))
                .pipe(rename({
                    basename: path.basename(file.path, '.json'),
                    extension: 'html',
                }))
                .pipe(pug({
                    doctype: 'html',
                    pretty: true,
                }))
                .pipe(gulp.dest(outputDir + '/posts'));
        }));
});

gulp.task('build-posts', [
    'posts:json-to-html'
]);

gulp.task('build', [
    'build-scss',
    'build-pages',
    'posts:json-to-html',
]);

gulp.task('clean', () => del([
    `${outputDir}/**/*`,
    `!${outputDir}/CNAME`,
    `!${outputDir}/static`,
    `!${outputDir}/static/**/*`,
    `${tempDir}/**/*`,
    `${tempDir}`,
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
    gulp.watch('*.pug', [ 'build-pages' ]);
    gulp.watch('posts/*.md', [ 'build-posts' ]);
    gulp.watch('templates/*.pug', [ 'build-pages', 'build-posts' ]);
    gulp.watch(outputDir + '/*').on('change', browserSync.reload);
});
