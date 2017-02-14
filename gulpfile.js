"use strict";

const 
	data = require('./data/project.js'),
	gulp = require('gulp'),
	rename = require('gulp-rename'),
	postcss = require('gulp-postcss'),
	sass = require('gulp-sass'),
	autoprefixer = require('autoprefixer'),
	fs = require('fs'),
	path = require('path'),
	copy = require('gulp-copy'),
	gulpData = require('gulp-data'),
	lessToScss = require('gulp-less-to-scss'),
	browserSync = require('browser-sync').create(),

	postPlugins = [autoprefixer];


function getContents(file) {
	return JSON.parse( fs.readFileSync(data.src.root + '/contents/' + path.basename(file.path) + '.json'));
}

function warnContentsFail(err) {
	console.log('[WARN] ' +err.message+ ' variables within it will not work.')
}


gulp.task('build:sass', function() {
	return gulp.src( data.build.source.main_sass )
		.pipe( sass().on('error', sass.logError) )
		.pipe( postcss(postPlugins) )
		.pipe( gulp.dest( data.build.root) )
		.pipe( browserSync.stream() );
})

gulp.task('minify:css', ['build:sass'], function() {
	return gulp.src( data.build.source.main_sass)
		.pipe( sass({outputStyle: 'compressed'}).on('error', sass.logError) )
		.pipe( rename( data.build.dest.css_min) )
		.pipe( gulp.dest( data.build.dest.css) )
		.pipe( browserSync.stream() );
})

gulp.task('build:copy', function() {
	return gulp.src( data.build.copy )
		.pipe( copy(data.build.root, {prefix: 1}) )
		.pipe( browserSync.stream() );
});

gulp.task('browsersync', function()
{
	browserSync.init({
		server: {
			baseDir: data.build.root
		}
	})
});

gulp.task('watch', function() {
	gulp.watch ( data.build.source.css, ['minify:css', 'build:copy'] )
	gulp.watch( [data.build.source.html, data.build.source.data], ['build:copy'] )
})

gulp.task('serve', ['minify:css','build:copy','browsersync','watch'], function() {
});

gulp.task('build', ['minify:css','build:copy'], function () {

});

gulp.task('lessToScss',function(){
    gulp.src('./test/*.less')
        .pipe(lessToScss())
        .pipe(gulp.dest('./scss'));
});


