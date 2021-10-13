//Calling installed packages and making variables. 
const {src, dest, watch, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
// const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass')(require('sass'));
const sassnode = require("node-sass");
//Webp
//const imagewebp = require('gulp-webp');


//Paths to files
const files={
    htmlPath: "src/**/*.html",
    // cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imgPath: "src/img/*",
    sassPath: "src/sass/*.scss"
}

function sassTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(sourcemaps.write('../maps'))
        .pipe(dest("pub/css"))
        .pipe(browserSync.stream());
}

//HTML-task copies HTML files to pub-folder
function copyHTML(){
    return src(files.htmlPath)
    .pipe(dest('pub'));
}

//Js-task, concatinating and minifying js-files to one main js in pub folder, making a source map file
function jsTask(){
   return src(files.jsPath)
   .pipe(sourcemaps.init())
   .pipe(concat('main.js'))
   .pipe(uglify())
   .pipe(sourcemaps.write('../maps'))
   .pipe(dest('pub/js'));
}
// //Css task, concatinating and minifying css files, creating a file in "pub"-folder with a source map
// function cssTask(){
//     return src(files.cssPath)
//     .pipe(sourcemaps.init())
//     .pipe(concat('main.css'))
//     .pipe(cssmin())
//     .pipe(sourcemaps.write('../maps'))
//     .pipe(dest('pub/css'))
//     .pipe(browserSync.stream());
// }
//image task that puts images into an img folder in "pub"-folder
function imgTask(){
    return src(files.imgPath)
    .pipe(dest('pub/img'));
}
// //Webp
// //function webpImage(){
//     //return src('pub/img/*.{jpg, png, jpeg}')
//     //.pipe(imagewebp)
//     .pipe(dest('pub/img'))
// }

//Watch task that watches if any changes has been done in any file, if there is a change, then it calls the functions
function watchTask(){
    browserSync.init({
        server: "./pub"
    });

    watch(
        [files.htmlPath, files.sassPath, files.jsPath, files.imgPath],
        parallel(copyHTML, sassTask, jsTask, imgTask)
      ).on("change", browserSync.reload);
}


    exports.default = series(
        parallel(copyHTML, jsTask, sassTask, imgTask),
        watchTask
      );