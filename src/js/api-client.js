var $ = require('jquery');

module.exports = {

	save: function(song, successCallback, errorCallback) {
		$.ajax({
			url: "/api/songs/",
			method: "post",
			data: song,
			success: successCallback,
			error: errorCallback
		});
	},

	delete: function(songId, successCallback, errorCallback) {
		$.ajax({
			url: "/api/songs/" + songId,
			method: "delete",
			success: successCallback,
			error: errorCallback
		});
	},

	list: function(successCallback, errorCallback) {
		$.ajax({
			url: "/api/songs/",
			method: "get",
			success: successCallback,
			error: errorCallback
		});
	}

};
