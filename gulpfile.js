const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const browserSync 	= require('browser-sync');
const soursemaps	= require('gulp-sourcemaps');
const concat		= require('gulp-concat');
const uglify		= require('gulp-uglifyjs');
const del			= require('del');
const cache			= require('gulp-cache');
const autoprefixer 	= require('gulp-autoprefixer');
const cssnano		= require('gulp-cssnano');
const styleInject 	= require("gulp-style-inject");
const notify		= require('gulp-notify');
const replace 		= require('gulp-replace');
const ttf2woff2 	= require('gulp-ttf2woff2');
const gulpSequence 	= require('gulp-sequence');
const rename 		= require('gulp-rename');
const imagemin = require('gulp-imagemin');

gulp.task('images', () =>
    gulp.src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('scss', function(){
	return gulp.src('assets/scss/**/*.scss')
	.pipe(soursemaps.init())
	.pipe(sass())
	.on('error', notify.onError(function(err){
		return {
			title: 'Styles',
			message: err.message
		}
		}))
	.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8'], { cascade: true }))
	.pipe(soursemaps.write())
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.reload({stream: true}))
	});

gulp.task('style', function(){
	return gulp.src('assets/scss/**/*.scss')
	.pipe(sass())
	.on('error', notify.onError(function(err){
		return {
			title: 'Styles',
			message: err.message
		}
		}))
	.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8'], { cascade: true }))
	.pipe(gulp.dest('assets/css'))
	});

gulp.task('header', function(){
	return gulp.src('assets/scss/headers.scss')
	.pipe(sass())
	.pipe(cssnano())
	.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8'], { cascade: true }))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('assets/css/'))
	.pipe(browserSync.reload({stream: true}))
	});

gulp.task('thank', function(){
	return gulp.src('assets/scss/thank.scss')
	.pipe(sass())
	.pipe(cssnano())
	.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8'], { cascade: true }))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('assets/css/'))
	.pipe(browserSync.reload({stream: true}))
	});

gulp.task('libs', function() {
	return gulp.src('assets/libs/**/*.scss')
	.pipe(concat('libs.scss'))
	.pipe(gulp.dest('assets/scss'))
	});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'assets'
			},
			notify: false
			});
	});

gulp.task('scripts', function() {
	return gulp.src([
		'assets/libs/common/jquery-2.2.4.min.js',
		'assets/libs/common/bootstrap.min.js',
		'assets/libs/slick-carousel/slick/*.js',
		'assets/libs/inputmask.js',
		'assets/libs/noframework.waypoints.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'));
	});

gulp.task('clean', function() {
	return del.sync('dist');
	});

gulp.task('clear', function() {
	return cache.clearAll();
	});

gulp.task('woff2', function(){
	gulp.src(['assets/fonts/*.ttf'])
	.pipe(ttf2woff2())
	.pipe(gulp.dest('assets/fonts/'));
	});

gulp.task('watch', ['browser-sync', 'libs', 'scss', 'scripts', 'header', 'thank'],  function() {
	gulp.watch('assets/scss/*.scss', ['header']);
	gulp.watch('assets/scss/thank.scss', ['thank']);
	gulp.watch('assets/scss/*.scss', ['scss']);
	gulp.watch('assets/*.html', browserSync.reload);
	gulp.watch('assets/js/**/*.js', browserSync.reload);
	});

gulp.task('remove', function() {
	gulp.src("assets/css/*.min.css")
	.pipe(replace('../', ''))
	.pipe(gulp.dest("assets/css"));
	});

gulp.task('inject', function() {
	gulp.src("dist/*.html")
	.pipe(styleInject())
	.pipe(gulp.dest("dist/"));
	})

gulp.task('moving', function() {
	var buildCss = gulp.src('assets/css/main.css')
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('assets/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildScripts = gulp.src('assets/js/*.js')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('assets/*.html')
	.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('assets/*.php')
	.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('assets/video/**.*')
	.pipe(gulp.dest('dist/video'));

	var buldFavicon = gulp.src('assets/*.{png,svg,jpg,ico}')
	.pipe(gulp.dest('dist'));

	var buildImage = gulp.src('assets/images/*.*')
	.pipe(gulp.dest('dist/images'));
	})

gulp.task('build', gulpSequence(['clean'], ['style', 'header', 'thank', 'scripts'], ['remove'], ['moving'], ['images']));

