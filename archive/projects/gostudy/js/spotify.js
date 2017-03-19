var musicApp = {};

// Call to get Foursquare results relating to the desire radius
musicApp.getInfo = function(){
  $.ajax({
      url : 'https://api.spotify.com/v1/search',
      // dataType : 'jsonp',
      type : 'GET',
      data : {
          client_id : 'de3105c7d73d4b4daad0f1b08ec2ce7f',
          client_secret : '65578e7d558b4c2fb7a649c9c7541ca8',
          // redirect_uri: 'http://localhost:8005/callback',
          q: 'study',
          type: 'playlist',
          limit: 20
      },
      success: function(res) {
          //console.log what the original response comes back as
          console.log(res);
          musicApp.displayMusic(res.playlists.items);
      }
  });
};

musicApp.events = function() {
 $('#submit').on('click', function(){
 	musicApp.getInfo();
 });
};

musicApp.displayMusic = function(playlists) {	
	console.log(playlists);
	$.each(playlists, function(i, single) {
	 var $name = $('<h3>').text(single.name);   
	 var $photo = $('<img>').attr('src', single.images[0].url);
   var $photoContainer = $('<div>').addClass('playlistPhoto').append($photo);
	 var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name);
	 var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
	 var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
	 $('.musicItems').append($singleItem);
	});
};


musicApp.init = function() {
	musicApp.events();
};

$(document).ready(function(){
	musicApp.init();

});