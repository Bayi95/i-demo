var path = require('path');
var url = require('url');
var gulp = require('gulp');//gulp基础模块
var watch = require('gulp-watch');//监听
var del = require('del');//删除文件
var webpack = require('gulp-webpack');//gulp和webpack结合使用
var runSequence = require('run-sequence');//运行一个gulp的task
var proxy = require('proxy-middleware');//browser-sync的反向代理
var mock = require('n-mock');//数据模拟
var browserSync = require('browser-sync').create();//利用他自动刷新浏览器
var reload = browserSync.reload;

var webpackConfig = require('./webpack.config');
var FILEPATH = {
    ENTRY: './src/app.js',
    DEST: './dist',
    WATCH_DEV: ['./src/**/*.html', './src/**/*.js', './src/**/*.css'],
    WATCH_WEBPACK: './dist/index.html'
};

//default
gulp.task('default', ['server'], function () {
    //监听文件变动
    FILEPATH.WATCH_DEV.forEach(function(i){
         watch(i, function () {
             runSequence('webpack');
         });
    })
    // 监听目标目录文件
    watch(FILEPATH.WATCH_WEBPACK, function () {
        browserSync.reload();
    });
});

gulp.task('webpack', ['clean'], function () {
    return gulp.src(FILEPATH.ENTRY)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(FILEPATH.DEST))
});
// server
gulp.task('server', ['webpack'], function () {
    //本地模拟数据
    //第一种前后端分离的方式
    //第二种前后端分离 是用node.js  线上的  我走node  node调java接口
    //利用brwoser-sync建立了一个本地接口服务
    
    // users匹配到mocks文件夹下的users.GET.response.200.json
    browserSync.init({
        server: FILEPATH.DEST,
        middleware: [
            mock(__dirname + '/mocks')
        ],
    });

    //代理线上接口
    //线上接口已经好了 但是和我的页面不是一个域名
    // var proxyOptions = url.parse('http://ciyuanai.net:8080/api/live');
    // proxyOptions.route = '/api/live';
    // // requests to `/api/live` are proxied to `http://ciyuanai.net:8080/api/live`
    // browserSync.init({
    //     open: true,
    //     port: 3000,
    //     server: {
    //         baseDir: "./dist",
    //         middleware: [proxy(proxyOptions)]
    //     }
    // });
});

gulp.task('clean', function () {
    return del([
        'dist/*.js',
        'dist/*.css'
    ]);
});