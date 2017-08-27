// Load plugins
var gulp            = require('gulp'),
	sass            = require('gulp-ruby-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cssnano         = require('gulp-cssnano'),
    browsersync     = require('browser-sync').create();

// Browsersync
gulp.task('browser-sync', function() {
    browsersync.init({
        proxy: "edc.dev"
    });
});

// Styles
gulp.task('sass', function() {
  return sass('src/sass/style.scss', { style: 'compressed' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('build/css'))
    .pipe(cssnano())
    .pipe(browsersync.reload({stream: true}));
});

/** Images
* This will take any source images and run them through the imagemin plugin. We can go a 
* little further and utilise caching to save re-compressing already compressed images each time this task runs
*/
// gulp.task('images', function() {
//   return gulp.src(['src/images/*','src/images/**/*'])
//     .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('dist/images'))
// });

// Create watch task
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('public/css/*.css');
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/sass/*.scss', ['sass']);
});