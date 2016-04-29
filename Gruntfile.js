module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            A: {
                files: ['css/pre/main.css'],
                tasks: ['default']
            },
            B: {
                files: ['js/main.js'],
                tasks: ['minimize']
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'css/maps/' // ...to the specified directory
                },
                processors: [
                    require('precss')({ /* options */ }),
                    require('postcss-color-function'),
                    require("postcss-calc"),
                    require("css-mqpacker"),
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                ]
            },
            dist: {
                src: 'css/pre/main.css',
                dest: 'css/main.css'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            flat: {
                files: {
                    'js/main.min.js': ['js/main.js']
                }
            }
        },
        concat: {
            dist: {
                src: [],
                dest: 'dist/built.js',
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("css-mqpacker");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['postcss:dist','cssmin']);
    grunt.registerTask('minimize', ['uglify:flat']);

};