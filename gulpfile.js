var path = require('path');

var gulp = require('gulp');
// Tasks
var fs = require('fs');
// Setting pattern this way allows non gulp- plugins to be loaded as well.
  var plugins = require('gulp-load-plugins')({
    pattern: '*',
    rename: {
      'node-sass-import-once': 'importOnce',
      'gulp-sass-glob': 'sassGlob',
      'run-sequence': 'runSequence',
      'gulp-clean-css': 'cleanCSS',
      'gulp-stylelint': 'gulpStylelint',
      'gulp-eslint': 'gulpEslint',
      'gulp-babel': 'babel',
      'gulp-util': 'gutil',
      'gulp-notify': 'notify',
      'gulp-concat': 'concat',
      'gulp-uglify': 'uglify',
      'gulp-imagemin': 'imagemin',
      'gulp-twig' : 'twig',
      'gulp-data' : 'data',
      'glob': 'glob',
      'flatten': 'gulp-flatten',
      'gulp-svg-sprite': 'svgsprite',
      'gulp-append-prepend': 'gap'
    }
  });
  //Default paths.
  var paths = {
    styles: {
      source: 'src/templates/',
      destination: 'assets/css/'
    },
    scripts: {
      source: 'src/templates/',
      destination: 'assets/js',

    },
    scriptsVendorFiles: [
      'node_modules/bootstrap/dist/js/bootstrap.js',
    ],
    images: {
      source: 'src/media/images/',
      destination: 'assets/images/'
    },
    fonts: {
      source: 'src/fonts/',
      destination: 'assets/fonts/'
    },
    styleGuide: 'styleguide',
    twigPages: {
      src: 'src/templates/' ,
      componentsSrc: 'src/templates/01-components/' ,
      componentBlocksSrc: 'src/templates/02-component-blocks/' ,
      pagesSrc: 'src/templates/03-pages/' ,
      destination: 'assets/pages/',
      componentsDestination:'assets/pages/01-components',
      componentBlocksDestination:'assets/pages/02-component-blocks',
      pagesDestination:'assets/pages/03-pages',
      componentTemplateSrc: 'src/templates/component-template.twig',
      componentBlockTemplateSrc: 'src/templates/component-block-template.twig'
    },
    svg : {
      source: 'src/media/svgs',
      destination: 'assets/svg',
      prefix: {
        dev: '',
        pro: '/svg/sprite'
      }
    }
  };


  //Default options.
  var options = {
    drupalLibraries: {
      destination:'./generated.libraries.yml'
    },
    // ----- Browsersync ----- //
    browserSync: {
      // Put your local site URL here to prevent Browsersync
      // from prompting you to add additional scripts to your page.
      // open: 'external',
      //xip: true,
      //logConnections: true

      server: {baseDir: ['assets']},
      startPath: "/pages",
      port: 3005,
      online: false,

      open: true,
      //ghostMode: false,
      logConnections: true,
    },

    // ----- CSS ----- //

    css: {
      files: path.join(paths.styles.destination, '**/*.css'),
      file: path.join(paths.styles.destination, '/styles.css'),
      destination: path.join(paths.styles.destination)
    },

    // ----- Sass ----- //

    sass: {
      files: path.join(paths.styles.source, '/**/*.scss'),
      file: path.join(paths.styles.source, 'styles.scss'),
      destination: path.join(paths.styles.destination),
      AUTOPREFIXER_BROWSERS: [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 9',
        'opera >= 23',
        'ios >= 8',
        'android >= 4.4',
        'bb >= 10'
      ]
    },

    // ----- JS ----- //
    js: {
      files: path.join(paths.scripts.source, '**/*.js'),
      compiledFiles: path.join(paths.scripts.destination, '**/*.js'),
      vendorFiles: paths.scriptsVendorFiles,
      destination: path.join(paths.scripts.destination),
      vendorDestination: path.join(paths.scripts.destination,'vendors')
    },

    // ----- eslint ----- //
    jsLinting: {
      files: {
        theme: [
          paths.scripts.source + '**/*.js',
          '!' + paths.scripts.source + '**/*.min.js'
        ],
        gulp: [
          'gulpfile.js',
          'gulp-tasks/**/*'
        ]
      }

    },
    // ----- Fonts ----- //
    fonts: {
      files: paths.fonts.source + '**/*.{ttf,woff,otf,eot,svg,woff2}',
      destination: paths.fonts.destination
    },
    // ----- Images ----- //
    images: {
      files: paths.images.source + '**/*.{png,gif,jpg,svg,xml,webmanifest}',
      destination: paths.images.destination
    },
    // ----- TWIG pages ---- //
    twigPages: {
      baseSrc: path.join(paths.twigPages.src),
      src: path.join(paths.twigPages.src, '/*.twig'),
      componentsSrc: path.join(paths.twigPages.componentsSrc, '/**/*.twig'),
      componentBlocksSrc: path.join(paths.twigPages.componentBlocksSrc, '/**/*.twig'),
      pagesSrc: path.join(paths.twigPages.pagesSrc, '/**/*.twig'),
      allSrc: path.join(paths.twigPages.src, '/**/*'), //Needed for watch task
      destination: path.join(paths.twigPages.destination),
      componentsDestination: path.join(paths.twigPages.componentsDestination),
      componentBlocksDestination: path.join(paths.twigPages.componentBlocksDestination),
      pagesDestination: path.join(paths.twigPages.pagesDestination),
      componentTemplateSrc: path.join(paths.twigPages.componentTemplateSrc),
      componentBlockTemplateSrc: path.join(paths.twigPages.componentBlockTemplateSrc)
    },

    // ------ pa11y ----- //
    pa11y: {
      urls: [ // An array of urls to test.
        // For testing in a travis environment:
        // 'http://127.0.0.1:8888',
        // 'http://127.0.0.1:8888/themes/custom/yourtheme/styleguide'
        'http://localhost:8000',
        'http://localhost:8000/node/1'
      ],
      failOnError: true, // fail the build on error
      showFailedOnly: true, // show errors only and override reporter
      reporter: 'console',
      includeWarnings: true, // including warnings by default. - set it to false to disable
      includeNotices: true, // including notices by default. - set it to false to disable
      log: {
        debug: console.log.bind(console),
        error: console.error.bind(console),
        info: console.info.bind(console)
      },
      standard: 'WCAG2AA', // choose from Section508, WCAG2A, WCAG2AA, and WCAG2AAA
      page: {
        settings: {
          loadImages: false,
          userName: '', // .htacess username
          password: '' // .htaccess password
        }
      },
      threshold: { // Set to -1 for no threshold.
        errors: 1,
        warnings: 10,
        notices: -1
      }
    },
    svg: {
      files: path.join(paths.svg.source, '**/*.svg'),
      destination: path.join(paths.svg.destination),
      mode: {
        symbol: { // symbol mode to build the SVG
          render: {
            css: true, // CSS output option for icon sizing
            scss: true // SCSS output option for icon sizing
          },
          dest: 'sprite', // destination folder
          prefix: '.svg--%s', // BEM-style prefix if styles rendered
          sprite: 'sprite.svg', //generated sprite name
          example: true // Build a sample page, please!
        }
      },
      prefix: paths.svg.prefix
    },

  }


  //Cargamos las task del gulp.
  require('./gulp-tasks/svg')(gulp, plugins, options);
  require('./gulp-tasks/twigpages')(gulp, plugins, options);
  require('./gulp-tasks/browser-sync')(gulp, plugins, options);
  require('./gulp-tasks/images')(gulp, plugins, options);
  require('./gulp-tasks/clean-css')(gulp, plugins, options);
  require('./gulp-tasks/clean-js')(gulp, plugins, options);
  require('./gulp-tasks/clean-styleguide')(gulp, plugins, options);
  require('./gulp-tasks/clean-twigpages')(gulp, plugins, options);
  require('./gulp-tasks/clean')(gulp, plugins, options);
  require('./gulp-tasks/compile-sass')(gulp, plugins, options);
  require('./gulp-tasks/compile-js')(gulp, plugins, options);
  require('./gulp-tasks/compile-styleguide')(gulp, plugins, options);
  require('./gulp-tasks/jekyll')(gulp, plugins, options);
  require('./gulp-tasks/lint-js')(gulp, plugins, options);
  require('./gulp-tasks/lint-css')(gulp, plugins, options);
  require('./gulp-tasks/minify-css')(gulp, plugins, options);
  require('./gulp-tasks/minify-js')(gulp, plugins, options);
  require('./gulp-tasks/fonts')(gulp, plugins, options);
  require('./gulp-tasks/drupal-libraries')(gulp, plugins, options);
  require('./gulp-tasks/build')(gulp, plugins, options);
  require('./gulp-tasks/watch')(gulp, plugins, options);
  require('./gulp-tasks/serve')(gulp, plugins, options);
  require('./gulp-tasks/default')(gulp, plugins, options);
  require('./gulp-tasks/drupal-dev')(gulp, plugins, options);

