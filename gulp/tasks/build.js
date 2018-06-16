var gulp = require('gulp'),
del = require('del'),
usemin = require('gulp-usemin'),
imagemin = require('gulp-imagemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDocs', function () {
  browserSync.init({
    notify: false,
    tunnel: true,
    tunnel: "infilimits",
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task('deleteDocsFolder',['icons'], function () {
  return del("./docs");
});

gulp.task('optimizeImages', ['deleteDocsFolder'], function () {
  return gulp.src(['./app/assets/images/**/*',  '!./app/assets/images/icons',  '!./app/assets/images/icons/**/*'])
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    multipass: true
  }))
  .pipe(gulp.dest("./docs/assets/images/"));
});

gulp.task('useminTrigger', ['deleteDocsFolder'], function () {
  gulp.start("usemin")
});

gulp.task('usemin', ['styles', 'scripts'], function () {
  return gulp.src("./app/index.html")
  .pipe(usemin({
      js: [function () {return rev() }, function (){return uglify()} ],
    css: [function () {return rev() }, function (){return cssnano()} ]
  }))
  .pipe(gulp.dest("./docs/"));
});

gulp.task('build', ['deleteDocsFolder', 'optimizeImages', 'useminTrigger']);
