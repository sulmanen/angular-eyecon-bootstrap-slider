'use strict';

var IS_TEAM_CITY = !! process.env.TEAMCITY_VERSION;

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            coverage: {
                src: ['test/coverage']
            },
            all: {
                src: ['tmp/']
            },
            server: {
                src: ['../public/app/']
            }
        },
        bower: {
            src: {
                options: {
                    targetDir: './app/vendor',
                    // this will strip component name
                    layout: 'byComponent',
                    install: false,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false,
                    bowerOptions: {
                        production: true
                    }
                }
            },
            test: {
                options: {
                    targetDir: './test/vendor',
                    // this will strip component name
                    layout: function () {
                        return '';
                    },
                    install: false,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false,
                    bowerOptions: {
                        production: false
                    }
                }
            }
        },
        concat: {
            dist: {
                src: ['app/js/angular/**/*.js'],
                dest: 'ecSlider.js',
            },
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            app: {
                options: {
                    jshintrc: 'app/.jshintrc'
                },
                src: ['app/js/angular/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/**/*.js']
            }
        },
        karma: {
            unit: {
                configFile: IS_TEAM_CITY ? 'config/karma.teamcity.conf.js' : 'config/karma.conf.js'
            },
            scenario: {
                configFile: IS_TEAM_CITY ? 'config/karma.teamcity.e2e.conf.js' : 'config/karma.e2e.conf.js'
            }
        },
        coverage: {
            options: {
                thresholds: {
                    'statements': 90,
                    'branches': 90,
                    'lines': 90,
                    'functions': 90
                },
                dir: 'coverage',
                root: 'test'
            }
        },
        plato: {
            all: {
                options: {
                    exclude: /\.min\.js$/,
                    jshint: grunt.file.readJSON('app/.jshintrc'),
                    complexity: {
                        logicalor: false,
                        switchcase: false,
                        forin: true,
                        trycatch: true
                    }
                },
                files: {
                    'report': ['app/js/angular/**/*.js']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, ['grunt-!(cli)']);

    grunt.registerTask('default', ['clean:all', 'bower', 'lint', 'test', 'concat']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('unit', ['clean:coverage', 'karma:unit']);
    grunt.registerTask('test', ['bower','lint', 'unit']);
    grunt.registerTask('cover', ['coverage']);
    grunt.registerTask('report', ['plato']);
    grunt.registerTask('pre-commit', ['test', 'report']);
};
