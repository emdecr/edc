// Pull in gulp plugins and assign to variables
var gulp          = require('gulp'),
    uglify        = require('gulp-uglifyjs'),
    plumber       = require('gulp-plumber'),
    sass          = require('gulp-ruby-sass'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant'),
    livereload    = require('gulp-livereload'),
    notify        = require('gulp-notify'),
    autoprefixer  = require('gulp-autoprefixer'),
    jshint        = require('gulp-jshint');
    minifyCss     = require('gulp-minify-css');

// Create custom variables to make life easier
var outputDir = 'dist';

var scriptList = [
  'js/customizer.js',
  'js/navigation.js',
  'js/skip-link-focus-fix.js',
  'js/script.js',
  'js/wow.min.js',
  'js/main.js'
];

// var fontIcons = [
//   'src/components/fontawesome/fonts/**.*', 
//   'src/components/monosocialiconsfont/MonoSocialIconsFont*.*'
// ];

var sassOptions = {
  style: 'nested'
};

// Create image minification task
gulp.task('imagemin', function () {
    return gulp.src('images/*')
      //.pipe(cache())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(outputDir + '/images'))
        .pipe(notify("image task finished"));
});

// Create js scripts concat and minify task.
gulp.task('js', function() {
  return gulp.src(scriptList)
    // .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(uglify('app.min.js', {outSourceMap: true}))
      .pipe(gulp.dest(outputDir + '/js'))
      .pipe(livereload())
      .pipe(notify("js task finished"));
});


// Create sass compile task
gulp.task('sass', function() {
    return sass('sass/style.scss', sassOptions) 
    .on('error', function (err) { console.error('Error!', err.message); })
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(minifyCss())
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(livereload())
    .pipe(notify("sass task finished"));
}); 

// Create fonticons compile task
// gulp.task('icons', function() { 
//     return gulp.src(fontIcons) 
//         .pipe(gulp.dest(outputDir + '/fonts')); 
// });

// Create watch task
gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('images/*', ['imagemin']);
  livereload.listen();
  gulp.watch('*.php').on('change', livereload.changed);
  gulp.watch('*.html').on('change', livereload.changed);
});

// Create default task so you can gulp whenever you don't want to watch
gulp.task('default', ['sass', 'js', 'imagemin', 'watch']);


