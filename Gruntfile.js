module.exports = function (grunt) {

	// source paths
	var base = 'themes/default/'; // theme root

	var build = { // build folders (where will the development happen?)
		scss: base + 'src/scss/',
		es6: base + 'src/es6/'
	}

	var dist = { // distribution folders (where should the output live?)
		css: base + 'dist/css',
		js: base + 'dist/js'
	}

	// build paths
	var paths = {
		css: {
			dest: dist.css,
			origin: [
				'*.scss',
				'**/*.scss'
			],
			watch: [
				build.scss + '*.scss',
				build.scss + '**/*.scss'
			]
		},
		js: {
			dest: dist.js,
			origin: [ // add new base js files here
				'app.es6'
			],
			watch: [
				build.es6 + '**/*.es6',
				build.es6 + '**/*.js'
			]
		}
	}

	var gruntConfig = {
		browserify: {
			dist: {
				options: {
					transform: [
						["babelify", {
							loose: "all"
						}]
					]
				},
				files: [{
					expand: true,
					cwd: build.es6,
					src: paths.js.origin,
					dest: paths.js.dest,
					ext: '.js'
				}]
			}
		},

		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: build.scss,
					src: paths.css.origin,
					dest: paths.css.dest,
					ext: '.css'
				}]
			}
		},

		cssmin : {
			minify : {
				expand : true,
				cwd : dist.css,
				src : [ '*.css', '!*.min.css' ],
				dest : dist.css,
				ext : '.min.css'
			}
		},

		uglify: {
			js: {
				files: [{
					expand: true,
					cwd: dist.js,
					src: [ '**/*.js' ],
					dest: dist.js,
				ext : '.min.js'
				}]
			}
		},

		watch: {
			js: {
				files: paths.js.watch,
				tasks: ["browserify"]
			},
			css: {
				files: paths.css.watch,
				tasks: ["sass"]
			},
			prod: {
				files: [].concat(paths.css.watch, paths.js.watch),
				tasks: ["default"]
			}
		}
	}

	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("js", ["browserify"]);
	grunt.registerTask("js:watch", ["watch:js"]);
	grunt.registerTask("js:prod", ["uglify:js"]);
	grunt.registerTask("css", ["sass"]);
	grunt.registerTask("css:watch", ["watch:css"]);
	grunt.registerTask("css:prod", ["cssmin"]);
	grunt.registerTask("default", ["js", "js:prod", "css", "css:prod"]);
};