var $ = require('jquery');


// al enviar formulario pulsando enter  o haciendo clic  en el botón
// enviamos una petición AJAX para almacernar la canción
$('.new-song-form').on("submit", function() {

	// Validación de inputs
	var inputs = $(".new-song-form input");
	for (var i = 0; i < inputs.length; i++){
		var input = inputs[i];
		if (input.checkValidity() == false) {
			alert(input.validationMessage);
			input.focus();
			return false;
		}
	}	
	

	// canción que quiero crear
	var song = {
		artist: $("#artist").val(),
		title: $("#title").val(),
		audio_utl: $("#audio_url").val(),
		cover_url: $("cover_url").val()
	};

	//petición AJAX para guardar la información en el backend
	$.ajax({
		url: "/api/songs/",
		method: "post",
		data: song,
		beforeSend: function(){
			$(inputs).attr('disabled', true); // deshabilito todos los inputs
			// Cambio el texto del botón y lo deshabilito
			$('.new-song-form button').text('Saving song...').attr("disabled", true);
		},
		success: function(response) {
			console.log("SUCCESS", response);
			$("form")[0].reset(); // borro todos los campos del formulario
			$("#artist").focus(); // pongo el foco en el campo artist
		},
		error: function(){
			console.error("ERROR", arguments);
		},
		complete: function(){
			$(inputs).attr('disabled', false); // habilito todos los inputs
			// Cambio el texto del botón y lo habilito
			$('.new-song-form button').text('Save Song').attr("disabled", false);
		}

	});

	return false; // == e.preventDefault();
});