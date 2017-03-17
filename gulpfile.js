var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    watch = require('watch'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('html', function(){
    gulp.src('./app/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', function(){
    // Single entry point to browserify
    gulp.src('./app/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream: true}));
});

gulp.task('images', function(){
   gulp.src('./app/assets/**/*.*')
       .pipe(gulp.dest('./dist/assets'));
});

gulp.task('watch', function(){
    gulp.watch('./app/**/*.*', ['html', 'scripts', 'images']);
});

gulp.task('browser-sync', function(){
    browserSync({
       server:{
           baseDir: './dist/'
       }
    });
});

gulp.task('default', ['html', 'scripts', 'images', 'browser-sync','watch']);