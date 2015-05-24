module.exports = function(grunt) {
	grunt.initConfig({
	    sass: {
	      dist: {
			options: {
				style: 'expanded'
			},
	        files: {
	          'static_src/css/style.css' : 'sass/style.scss'
	        }
	      }
	    },
		coffee: {
		  compile: {
		    files: {
		      'static_src/js/controller.js' : 'coffee/*.coffee'
		    }
		  }
		},
		handlebars: {
			compile: {
				options: {
					namespace: "EmployeeDirectory"
				},
				files: {
					'static_src/js/view.js' : 'hbs/**/*.hbs'
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: true,
				keepSpecialComments: 0
			},
			target: {
				files: {
					'public/css/vendor.min.css' : ['static_src/css/vendor/bootstrap.css', 'static_src/css/vendor/bootstrap-theme.css'],
					'public/css/style.min.css' : ['static_src/css/style.css']
				}
			}
		},
		uglify: {
			target: {
				files: {
					'public/js/controller.min.js' : ['static_src/js/controller.js'],
					'public/js/view.min.js' : ['static_src/js/view.js'],
					'public/js/vendor.min.js' : [
						'static_src/js/vendors/modernizr.js',
						'static_src/js/vendors/jquery.js',
						'static_src/js/vendors/jquery.uriAnchor.js',
						'static_src/js/vendors/jquery.event.gevent.js',
						'static_src/js/vendors/jquery.event.ue.js',
						'static_src/js/vendors/jquery.validate.js',
						'static_src/js/vendors/jquery.cookie.js',
						'static_src/js/vendors/handlebars.runtime.js'
					]
				}
			}
		},
		watch: {
			sass: {
				files: ['sass/**/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: true
				}
			},
			coffee: {
				files: ['coffee/**/*.coffee'],
				tasks: ['coffee'],
				options: {
					livereload: true
				}
			},
			handlebars: {
				files: ['hbs/**/*.hbs'],
				tasks: ['handlebars'],
				options: {
					livereload: true
				}
			},
			cssmin: {
				files: [
					'static_src/css/style.css',
					'static_src/css/vendor/bootstrap.css',
					'static_src/css/vendor/bootstrap-theme.css'
				],
				tasks: ['cssmin'],
				options: {
					livereload: true
				}
			},
			uglify: {
				files: [
					'static_src/js/view.js',
					'static_src/js/controller.js',
					'static_src/js/vendors/modernizr.js',
					'static_src/js/vendors/jquery.js',
					'static_src/js/vendors/jquery.uriAnchor.js',
					'static_src/js/vendors/jquery.event.gevent.js',
					'static_src/js/vendors/jquery.event.ue.js',
					'static_src/js/vendors/jquery.validate.js',
					'static_src/js/vendors/jquery.cookie.js',
					'static_src/js/vendors/handlebars.runtime.js'
				],
				tasks: ['uglify'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.registerTask('default', ['sass','coffee','handlebars','cssmin','uglify','watch']);
}