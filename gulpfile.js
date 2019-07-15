const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber'); //コンパイル止めない
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); //ベンダープレフィックス付与
const cssDeclarationSorter = require('css-declaration-sorter'); //プロパティの順番調整
const mqpacker = require('css-mqpacker'); //media query 整理
const header = require('gulp-header');

//ベンダープレフィックス付与とプロパティの順番指定
const plugin = [
	autoprefixer({
		browsers: [
			'last 2 version'
		]
	}),
	cssDeclarationSorter({
		order: 'smacss'
	})
];

gulp.task('sass', () => {
	gulp.src('./src/**/*.scss')
	.pipe(plumber())
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(postcss(plugin))
	.pipe(header('@charset "UTF-8";\n\n'))
	.pipe(gulp.dest('./'));
});

gulp.task('browsersync', () => {
	browserSync.init({
	  server: {
			baseDir: './'
		},
		startPath: '',
		open: 'external',
		notify: false
	});
});

gulp.task('reload', () => {
	browserSync.reload();
});

// gulp.task('babel', () => {
// 	gulp.src('./src/js/*.js')
// 	.pipe(babel({
// 		presets: ["es2015"]
// 	}))
// 	.pipe(gulp.dest('./js/'));
// });

gulp.task('watch', ['browsersync'], () => {
	gulp.watch('./src/**/*.scss', ['sass']);
	gulp.watch('./src/**/*.*', ['reload']);
	gulp.watch('*.*', ['reload']);
});