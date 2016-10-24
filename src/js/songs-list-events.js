var $ = require('jquery');
var songsListManager = require('./songs-list-manager');

$(".songs-list").on("click", ".delete-button", function(){
	var songId = $(this).parent().data('id');
	$(this).hide();
	songsListManager.delete(songId);
});
