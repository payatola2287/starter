module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            A: {
                files: ['src/css/*.css','src/*.css'],
                tasks: ['default']
            },
            B: {
                files: ['src/js/*.js','src/*.js'],
                tasks: ['minimize']
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'maps/css' // ...to the specified directory
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
                src: 'src/main.css',
                dest: 'dist/style.css'
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
        }
    });
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("css-mqpacker");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['postcss:dist','cssmin']);
    grunt.registerTask('minimize', ['uglify:flat']);

};