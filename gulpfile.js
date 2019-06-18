const {src, dest, series, watch} = require('gulp');
const del = require('del');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const sync = require('browser-sync').create();
const image = require('gulp-image');


function html() {
  return src('src/**html')
    .pipe(dest('dist'));
};

function js() {
  return src('src/js/**.js')
    .pipe(dest('./dist/js'));
};

function sass() {
  return src('src/sass/style.scss')
    .pipe(scss())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 15 version', '> 1%', 'ie 8', 'ie 7']
    }))
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(dest('./dist/css'));
  };

function img() {
  return src('src/img/*')
    .pipe(image())
    .pipe(dest('./dist/img'));
};

function clear() {
  return del('dist');
};

function serve() {
  sync.init({
      server: './dist'
  });
  watch('src/**html', series(html)).on('change', sync.reload);
  watch('src/sass/**/**.scss', series(sass)).on('change', sync.reload);
  watch('src/img/*', series(img)).on('change', sync.reload);
  watch('src/js/**.js', series(js)).on('change', sync.reload);
};

exports.clear = clear;
exports.build = series(clear, sass, html, img, js);
exports.serve = series(clear, sass, html, img, js, serve);
