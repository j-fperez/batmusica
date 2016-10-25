var $ = require('jquery');
var apiClient = require('./api-client');
var songsListManager = require('./songs-list-manager');

var newSongFormButton = $('.new-song-form button');

function setLoading(){ // antes de enviar la petición
	$(inputs).attr('disabled', true); // deshabilito todos los inputs
	// Cambio el texto del botón y lo deshabilito
	newSongFormButton.text('Saving song...').attr("disabled", true);
}

function unsetLoading(){
	$(inputs).attr('disabled', false); // habilito todos los inputs
	// Cambio el texto del botón y lo habilito
	newSongFormButton.text('Save Song').attr("disabled", false);
}


// al enviar formulario pulsando enter  o haciendo clic  en el botón
// enviamos una petición AJAX para almacernar la canción
$('.new-song-form').on("submit", function() {
	debugger;
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
		artist: $("#artist").val(), // document.getElementById("artist").value
		title: $("#title").val(),
		audio_url: $("#audio_url").val(),
		cover_url: $("#cover_url").val()
	};

	setLoading(); // deshabilito el formulario

	apiClient.save(song, function(response) {
		$("form")[0].reset(); // borro todos los campos del formulario
		$("#artist").focus(); // pongo el foco en el campo artist
		songsListManager.load();
		unsetLoading();
	}, function() {
		console.error("ERROR", arguments);
		unsetLoading();
	});

	return false; // == e.preventDefault();
});
