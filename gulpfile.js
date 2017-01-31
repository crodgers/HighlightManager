const gulp = require('gulp');
const mocha = require('gulp-mocha');
const util = require('gulp-util');
 
gulp.task('test', function () {
    return gulp.src(['test/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', util.log)
        .on('end', () => {
            process.exit();
        });
});