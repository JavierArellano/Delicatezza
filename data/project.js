const 
	NAME = 'Delicatezza',
	MAIN_CSS_FILE = 'main',
	PROD_ROOT = './dist',
	DEV_ROOT = './src',
	CONTENTS_FOLDER = '/contents'

module.exports = {
	main: {

		name: NAME

	},

	build: {
		root: PROD_ROOT,
		source: {
			main_sass: DEV_ROOT + '/**/' +MAIN_CSS_FILE+ '.scss',
			css: [ DEV_ROOT + '/**/*.sass', DEV_ROOT+'/**/*.scss'],
			html: [ DEV_ROOT+'/**/*.html'],
			data: [ DEV_ROOT+'/**/*.pug.json']
		},

		dest: {
			css: PROD_ROOT + '/css',
			css_min: MAIN_CSS_FILE + '.min.css'
		},

		copy: [
			DEV_ROOT+'/**/*.css',
			DEV_ROOT+'/**/*.js',
			DEV_ROOT+'/**/*.html',
			DEV_ROOT+'/**/*.jpg'
		]
	},

	src: {
		root: DEV_ROOT,
		contents: DEV_ROOT + CONTENTS_FOLDER
	}
}