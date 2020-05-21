const gulp = require('gulp');
const fs = require('fs');
const map = require('map-stream');
const del = require('del');
const merge = require('merge-stream')
const vinylBuffer = require('vinyl-buffer')
const vinylPaths = require('vinyl-paths')
const runSequence = require('run-sequence').use(gulp)
const spritesmith = require('gulp.spritesmith-multi')
const jsonTransform = require('gulp-json-transform')

const $ = require('gulp-load-plugins')({ camelize: true })

const gulpConfig = {
  autoprefixer: ['> 1%', 'last 2 versions', 'iOS 5', 'Android 2.3', 'FF 20', 'IE 8'],
  xlt: {
    domain: 'http://xlt-api.linecorp.com',
    service: 'LINE Blockchain Platform',
    device: 'Web Browser',
    subname: '1.0'
  }
}
const path = {
  temp: './temp',
  locale: './src/resource/locale'
}

/**
 * XLT: get xlt properties file and convert json
 * @example gulp xlt
 */

gulp.task('xlt-download', () => {
  return $.downloadStream({
    file: 'xlt.zip',
    url: `${gulpConfig.xlt.domain}/downloadXLT/${encodeURIComponent(gulpConfig.xlt.service)}/${encodeURIComponent(gulpConfig.xlt.device)}/${encodeURIComponent(gulpConfig.xlt.subname)}.nhn?format=properties&valueTrim=true`
  }).pipe(gulp.dest(path.temp))
})
gulp.task('xlt-unzip', ['xlt-download'], () => {
  return gulp.src(path.temp + '/xlt.zip')
    .pipe($.decompress({
      strip: 1
    }))
    .pipe(gulp.dest(path.temp + '/xlt'))
})
gulp.task('xlt-json', ['xlt-unzip'], () => {
  return gulp.src(path.temp + '/xlt/*.properties')
    .pipe($.props2json())
    .pipe(gulp.dest(path.locale))
})
// gulp.task('xlt-rewrite', ['xlt-json'], () => {
//   gulp.src(path.locale + '/*.json')
//     .pipe(jsonTransform(function(data, file) {
//       for (var key in data) {
//         if (key.indexOf('square.spambot') < 0) delete data[key];
//       }
//       return data;
//   }))
//   .pipe(gulp.dest(path.locale))
// })
// gulp.task('xlt', ['xlt-rewrite'], () => {
gulp.task('xlt', ['xlt-json'], () => {
  return gulp.src(path.temp, {
      read: false
    })
    .pipe(vinylPaths(del))
})

gulp.task('dedup_xlt', () => {

  var xltKeyArr = [];
  var wrongXltKeyArr = [];

  let stream = gulp.src('./src/js/**/*.js')
    .pipe(map(function (file) {
      fs.readFile(file.path, 'utf-8', function (_err, _data) {
        let regExpMatch = _data.match(/i18n\.get\(['|"](.+)['|"]/ig);

        if (regExpMatch) {
          regExpMatch.map((item) => {
            let xltKey = item.replace("i18n.get(\'", "").replace("i18n.get(\"", "").replace("\'", "").replace("\"", "");
            if (xltKey[xltKey.length - 1] === ".") {
              wrongXltKeyArr.push[xltKey]
            } else {
              xltKeyArr.push(xltKey)
            }
          });
        }
      });
      console.log(xltKeyArr);
    }));

  return stream;
});
