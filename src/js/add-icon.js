var $ = require('jquery');

$('.icon-add').on("click", function(){
	$("body").toggleClass("form-shown").toggleClass('songs-list-shown');
});
