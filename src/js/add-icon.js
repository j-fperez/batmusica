var $ = require('jquery');

$('.add-icon').on("click", function(){
	$("body").toggleClass("form-shown").toggleClass('songs-list-shown');
});
