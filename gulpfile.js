const gulp = require('gulp');
const connect = require('gulp-connect');
const minify = require('gulp-minify-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const node = require('node-sass');
const htmlmin = require('gulp-htmlmin')
//拷贝html
gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(htmlmin({
            removeEmptyAttibutes: true, // 移出所有空属性
            collapseWhitespace: true, // 压缩 html
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload())
})
// 处理图片 imagesmin对图片在进行压缩
gulp.task('images', function () {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload())
})
//处理js
gulp.task('scrpit', function () {
    return gulp.src(['*.js', '!gulpfile.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
})
//处理css样式
gulp.task('sassindex', function () {
    return gulp.src('./styleheet/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(minify())
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})
gulp.task('sassbanner', function () {
    return gulp.src('./styleheet/banner.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(minify())
        .pipe(rename('banner.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})
//处理数据源
gulp.task('data', function () {
    return gulp.src(['*.json', '!package.json'])
        .pipe(gulp.dest('dist/data'))
        .pipe(connect.reload())
})
gulp.task('build', ['html', 'images', 'scrpit', 'data', 'sassindex', 'sassbanner'])

//编写监听
gulp.task('watch', function () {
    gulp.watch('*.html', ['html'])
    gulp.watch('images/**/*', ['images'])
    gulp.watch(['*.js', '!gulpfile.js'], ['scrpit'])
    gulp.watch('./styleheet/index.scss', ['sassindex'])
    gulp.watch('./styleheet/banner.scss', ['sassbanner'])
    gulp.watch(['*.json', '!package.json'], ['data'])
})
gulp.task('server', function () {
    connect.server({
        root: 'dist',
        port: 8888,
        livereload: true
    })
})
//同时启动服务和监听

gulp.task("default", ['watch', 'server']);