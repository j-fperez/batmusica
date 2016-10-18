// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require ('browser-sync').create();
var concat = require('gulp-concat');

// variables de patrones de archivos
var jsFiles = ["src/js/*.js", "src/js/**/*.js"]

// definimos tarea por defecto
gulp.task("default", ["concat-js", "compile-sass"], function() {

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

	//observar cambios en archivos JS para concatenar
	gulp.watch(jsFiles, ["concat-js"]);

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

// definimos la tarea para cncatenar JS
gulp.task("concat-js", function(){
	gulp.src(jsFiles)
	.pipe(concat("app.js"))
	.pipe(gulp.dest("dist/js/"))
	.pipe(notify({
		title: "JS",
		 message: "Concatenated!"
	}))
	.pipe(browserSync.stream());
});
