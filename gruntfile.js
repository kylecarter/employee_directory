module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'static_src/css/style.css' : 'sass/style.sass'
				}
			}
		},
		purifycss: {
			target: {
				src: ['public/**/*.html', 'hbs/**/*.hbs', 'static_src/js/vendor.js'],
				css: ['static_src/css/vendor/**/*.css','static_src/css/style.css'],
				dest: 'static_src/css/style.pure.css'
			}
		},
		coffee: {
			compile: {
				options: {
					bare: true
				},
				files: {
					'static_src/js/controller.js' : [
						'coffee/EmployeeDirectory.coffee',
						'coffee/modules/utils/EmployeeDirectory.utils.coffee',
						'coffee/modules/utils/EmployeeDirectory.create.coffee',
						'coffee/modules/utils/EmployeeDirectory.delete.coffee',
						'coffee/modules/utils/EmployeeDirectory.premissions.coffee',
						'coffee/modules/utils/EmployeeDirectory.read.coffee',
						'coffee/modules/utils/EmployeeDirectory.update.coffee',
						'coffee/modules/states/EmployeeDirectory.contact.coffee',
						'coffee/modules/states/EmployeeDirectory.employee.coffee',
						'coffee/modules/states/EmployeeDirectory.login.coffee',
						'coffee/modules/states/EmployeeDirectory.notfound.coffee',
						'coffee/modules/states/EmployeeDirectory.reset.coffee',
						'coffee/modules/states/EmployeeDirectory.search.coffee',
						'coffee/EmployeeDirectory.shell.coffee',
					]
				}
			}
		},
		handlebars: {
			compile: {
				options: {
					namespace: "EmployeeDirectoryViews"
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
					'public/css/style.min.css' : ['static_src/css/style.pure.css']
				}
			}
		},
		concat: {
			options: {
				separator: '\n',
			},
			dist: {
				src: [
					'static_src/js/vendors/modernizr.js',
					'static_src/js/vendors/jquery.js',
					'static_src/js/vendors/jquery.uriAnchor.js',
					'static_src/js/vendors/jquery.event.gevent.js',
					'static_src/js/vendors/jquery.event.ue.js',
					'static_src/js/vendors/jquery.validate.js',
					'static_src/js/vendors/jquery.cookie.js',
					'static_src/js/vendors/dropdown.js',
					'static_src/js/vendors/modal.js',
					'static_src/js/vendors/handlebars.runtime.js'
				],
				dest: 'static_src/js/vendor.js',
			},
		},
		uglify: {
			target: {
				files: {
					'public/js/controller.min.js' : ['static_src/js/controller.js'],
					'public/js/view.min.js' : ['static_src/js/view.js'],
					'public/js/vendor.min.js' : ['static_src/js/vendor.js']
				}
			}
		},
		watch: {
			sass: {
				files: ['sass/**/*.sass'],
				tasks: ['sass','purifycss','cssmin'],
				options: {
					livereload: true
				}
			},
			coffee: {
				files: ['coffee/**/*.coffee'],
				tasks: ['coffee','concat','uglify'],
				options: {
					livereload: true
				}
			},
			handlebars: {
				files: ['hbs/**/*.hbs'],
				tasks: ['handlebars','concat','uglify'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-purifycss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.registerTask('default', ['sass','coffee','handlebars','cssmin','purifycss','concat','uglify','watch']);
}
