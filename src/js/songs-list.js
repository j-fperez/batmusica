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

		            var cover_url = song.cover_url;
					if (cover_url == "" | cover_url == undefined) {
						cover_url = 'src/img/disc-placeholder.jpg';	
					}
		            var html = '<article class="song">';
		            html += '<img class="cover" src="' + cover_url + '">';
		            html += '<div class="artist">' + utils.escapeHTML(song.artist) + '</div>';
		            html += '<div class="title">' + utils.escapeHTML(song.title) + '</div>';
		            html += '</article>';
		            $('.songs-list').append(html);
		        }
		    },
		    error: function(response){
		    	console.error("ERROR", response);
		    }
		});
	}
}
