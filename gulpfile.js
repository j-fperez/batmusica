// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require ('browser-sync').create();
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');


// variables de patrones de archivos
var jsFiles = ["src/js/*.js", "src/js/**/*.js"]

// definimos tarea por defecto
gulp.task("default", ["concat-js", "compile-sass"], function() {

	// iniciar browserSync
	browserSync.init({
		//server: "./", //levanta el servidor en la carpeta actual
		proxy: "127.0.0.1:8000", // actúa como proxy enviando las peticiones a sparrest
		browser: "google chrome canary"
	});

	//observa cambios en archivos SASS y ejecuta la tarea de compilación
	gulp.watch("src/scss/*.scss", ["compile-sass"]);

	// observa cambios en archivos HTML y recargue el navegador
	gulp.watch("*.html").on("change", browserSync.reload); 
});

	//observar cambios en archivos JS para concatenar
	gulp.watch(jsFiles, ["concat-js"]);

// definimos la tarea para compilar SAAS
gulp.task("compile-sass", function(){
});

// definimos la tarea para concatenar JS
gulp.task("concat-js", function(){
	gulp.src("src/js/app.js")
	.pipe(tap(function(file){ // tap nos permite ejecutar un código por cada fichero seleccionado en el paso anterior
		file.contents = browserify(file.path).bundle(); //pasamos el archivo por broserify para importar los require
	}))
	.pipe(buffer()) // covertir cada archivo en un stream
	.pipe(gulp.dest("dist/js/"))
	.pipe(notify({
		title: "JS",
		 message: "Concatenated!"
	}))
	.pipe(browserSync.stream());
});
