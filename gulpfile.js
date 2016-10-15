// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');

// definimos tarea por defecto
gulp.task("default", function() {
	console.log("Hello World");
});

// definimos la tarea para compilar SAAS
gulp.task("compile-sass", function(){
	gulp.src("./src/scss/style.scss") // cargamos el archivo
	.pipe(sass()) // compilamos el archivo SASS
	.pipe(gulp.dest("./dist/css/")) // guardamos el archivo en dist/css
});
