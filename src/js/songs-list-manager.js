var $ = require('jquery');
var utils = require("./utils");

module.exports = {
	load: function(){
		// Petición AJAX para cargar la lista de canciones
		$.ajax({
		    url: "/api/songs/?_order=id",
		    success: function(response) {
		    	$('.songs-list').html(''); // vaciamos la lista
		        for (var i in response) {
		            var song = response[i];

		            var cover_url = song.cover_url || "";
					if (cover_url == "") {
						cover_url = 'src/img/disc-placeholder.jpg';	
					}
					var id = song.id || "";
					var artist = song.artist || "";
					var title = song.title || "";

		            var html = '<article class="song" data-id="' + id + '">';
		            html += '<img class="cover" src="' + cover_url + '">';
		            html += '<img class="delete-button" src="src/img/icon-trash.png" title="Delete song">';
		            html += '<div class="artist">' + utils.escapeHTML(artist) + '</div>';
		            html += '<div class="title">' + utils.escapeHTML(title) + '</div>';
		            html += '</article>';
		            $('.songs-list').append(html);
		        }
		    },
		    error: function(response){
		    	console.error("ERROR", response);
		    }
		});
	},
	delete: function(songId){
		var self = this;
		$.ajax({
			url: "/api/songs/" + songId,
			method: "delete",
			success: function(){
				self.load();
			},
			error: function(response){
				console.log("Error al borrar la canción", response);
			}
		});
	}
}
