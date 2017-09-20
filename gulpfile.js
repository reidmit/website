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
const config = {
    outputDir,
    tempDir,
    postsTempDir: tempDir + '/posts',
    postsOutputDir: outputDir + '/posts',
    pugOptions: {
        doctype: 'html',
        pretty: true,
    },
    browserSyncOptions: {
        server: {
            baseDir: outputDir
        }
    },
    markdownOptions: {
        highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (_) {}
            }

            return '';
        }
    }
}

function getJsonFile(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

gulp.task('build-scss', () => {
    return gulp.src('*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(outputDir));
});

gulp.task('build-pages', () => {
    return gulp.src('*.pug')
        .pipe(plumber())
        .pipe(data(() => {
            const d = { posts: [] };
            fs.readdirSync(config.postsTempDir).forEach(file => {
                d.posts.push(getJsonFile(config.postsTempDir + '/' + file));
            });
            return d;
        }))
        .pipe(pug(config.pugOptions))
        .pipe(gulp.dest(outputDir));
});

gulp.task('posts:markdown-to-json', () => {
    return gulp.src('posts/*.md')
        .pipe(markdownToJson((input) =>
            markdown(config.markdownOptions).render(input)))
        .pipe(gulp.dest(config.postsTempDir));
});

gulp.task('posts:json-to-html', ['posts:markdown-to-json'], () => {
    return gulp.src(config.postsTempDir + '/*.json')
        .pipe(foreach((stream, file) => {
            return gulp.src('templates/post.pug')
                .pipe(plumber())
                .pipe(data(() => getJsonFile(file.path)))
                .pipe(rename({
                    basename: path.basename(file.path, '.json'),
                    extension: 'html',
                }))
                .pipe(pug(config.pugOptions))
                .pipe(gulp.dest(config.postsOutputDir));
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
    browserSync.init(config.browserSyncOptions);
});

gulp.task('default', ['build', 'browser-sync'], () => {
    gulp.watch('*.scss', [ 'build-scss' ]);
    gulp.watch('*.pug', [ 'build-pages' ]);
    gulp.watch('posts/*.md', [ 'build-pages', 'build-posts' ]);
    gulp.watch('templates/*.pug', [ 'build-pages', 'build-posts' ]);
    gulp.watch(outputDir + '/**/*').on('change', browserSync.reload);
});
