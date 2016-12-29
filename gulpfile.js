var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var babelify = require('babelify');
var watchify = require('watchify');
var plumber = require('gulp-plumber');
var streamify = require('gulp-streamify');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var source = require('vinyl-source-stream');

var dependencies = [
    'react',
    'react-dom',
    'react-router',
    'underscore'
];

gulp.task('browserify', ['browserify-vendor'], function() {
    return browserify({ entries: 'app/public/js/app.js', debug: true })
        .external(dependencies)
        .transform(babelify, { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('app/public/dist'));
});

gulp.task('browserify-vendor', function() {
    return browserify()
        .require(dependencies)
        .bundle()
        .pipe(source('vendor.bundle.js'))
        .pipe(gulp.dest('app/public/dist'));
});

gulp.task('styles', function() {
    return gulp.src(['app/public/styles/styles.less'])
        .pipe(concat('styles.less'))
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('app/public/dist/styles'));
});

gulp.task('watch', function() {
    gulp.watch('app/public/styles/*.less', ['styles']);
});

gulp.task('images', function() {
    return gulp.src('app/public/img/**/*.*')
        .pipe(gulp.dest('app/public/dist/img'));
});

gulp.task('browserify-watch', ['browserify-vendor'], function() {
    var bundler = watchify(browserify({ entries: 'app/public/js/app.js', debug: true }, watchify.args));
    bundler.external(dependencies);
    bundler.transform(babelify, { presets: ['es2015', 'react'] });
    bundler.on('update', rebundle);
    return rebundle();

    function rebundle() {
        return bundler.bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('app/public/dist'));
    }
});

gulp.task('vendor', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js'
    ]).pipe(concat('vendor.js'))
        .pipe(gulp.dest('app/public/dist'));
});


gulp.task('default', ['styles', 'images', 'vendor', 'browserify-watch', 'watch']);
gulp.task('build', ['styles', 'images', 'vendor', 'browserify']);