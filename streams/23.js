
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.src('./js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./build'));
