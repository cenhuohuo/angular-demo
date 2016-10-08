var gulp = require('gulp');
var clean = require('gulp-clean');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('clean', function () {
    gulp.src('build/*.*').pipe(clean());
});
gulp.task('lib', function () {
    gulp.src([
        'lib/flexible.js',
        'lib/angular/angular.min.js',
        'lib/angular/angular-resource.min.js',
        'lib/angular-ui-router.js',
        'lib/me-lazyload.js',
        'lib/angularjs-toaster/toaster.min.js',
        'lib/ngInfiniteScroll-master/ng-infinite-scroll.min.js',
        'lib/ui-bootstrap-tpls.js',
        'lib/swiper/swiper.min.js'
    ]).pipe(concat('lib.min.js')).pipe(uglify()).pipe(gulp.dest('build'));
});
gulp.task('app', function () {
    gulp.src('js/**/*.js').pipe(concat('app.min.js')).pipe(uglify()).pipe(gulp.dest('build'));
});
gulp.task('css', function () {
    gulp.src(['css/*.css','lib/swiper/swiper-3.3.1.min.css','lib/angularjs-toaster/toaster.css']).pipe(concat('style.min.css')).pipe(cleanCss()).pipe(gulp.dest('build'))
});
gulp.watch('js/**/*.js',['app']);
gulp.watch(['css/*.css','lib/swiper/swiper-3.3.1.min.css','lib/angularjs-toaster/toaster.css'],['css']);

gulp.task('default', ['app', 'lib','css'], function () {
    console.log('任务完成');
});