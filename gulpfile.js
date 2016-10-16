// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require ('browser-sync').create();

// definimos tarea por defecto
gulp.task("default", ["compile-sass"], function() {

	// iniciar browserSync
	browserSync.init({
		server: "./", //levanta el servidor en la carpeta actual
		browser: "google chrome"
	});

	//observa cambios en archivos SASS y ejecuta la tarea de compilación
	gulp.watch("src/scss/*.scss", ["compile-sass"]);

	// observa cambios en archivos HTML y recargue el navegador
	gulp.watch("*.html").on("change", browserSync.reload); 
});

// definimos la tarea para compilar SAAS
gulp.task("compile-sass", function(){
	gulp.src("./src/scss/style.scss") // cargamos el archivo
	.pipe(sass().on('error', sass.logError)) // compilamos el archivo SASS y controlamos los errores
	.pipe(gulp.dest("./dist/css/")) // guardamos el archivo en dist/css
	.pipe(notify({
		title: "SASS",
		 message: "Compiled!"
	}))
	.pipe(browserSync.stream());
});
