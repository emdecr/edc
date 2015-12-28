var studyApp = {};

// GEOLOCATION
studyApp.lat = '';
studyApp.lng = '';
studyApp.venueLat = '';
studyApp.venueLng = '';
studyApp.getLocation = function() {
  //Asks user to allow us to get their current position
  navigator.geolocation.getCurrentPosition(function(pos) {
    studyApp.lat = pos.coords.latitude;
    studyApp.lng = pos.coords.longitude;
    studyApp.events();
  });
};

// Call to get Foursquare results relating to the desire radius
studyApp.getInfo = function(location, distance){
  $.ajax({
      url : 'https://api.foursquare.com/v2/venues/explore',
      dataType : 'jsonp',
      type : 'GET',
      data : {
          client_id : 'ZHRXIVYVW0V12O5EJKB3IAVECFDCIS4CR0IKD2BZ5BR20MZ0',
          client_secret : 'LSNZH50TMXL4YEQFDB25OPM0GENFDDHIHSWCZOA3ADC2RVZ5',
          v: '20150615',
          ll: studyApp.lat + ',' + studyApp.lng, 
          // ll: 43.6547406 + "," + -79.3759241,
          //depending on result density, sometimes far away venues do not show up within 50 search results, which creates an inaccuracy for distance option
          limit: 50,
          venuePhotos: 1,
          query: location,
          radius: distance
      },
      success: function(res) {
          //console.log what the original response comes back as
          console.log(res);
          if (distance == '2000') {
              studyApp.displayWalk(res.response.groups[0].items);
          } else if (distance == '5000') {
              studyApp.displayBike(res.response.groups[0].items);
          } else if (distance == '10000') {
              studyApp.displayDrive(res.response.groups[0].items);
          }
      }
  });
};

studyApp.events = function() {
 $('#submit').on('click', function(e){
    e.preventDefault();
    $('.printContainer').removeClass('hidden');
    $('.backToTop').removeClass('hidden');
    $('#map').addClass('map');
   var searchLoc = $('input.noiseLoc:checked').val();
   // console.log(searchLoc);
   var searchDist = $('input.transport:checked').val();
   // console.log(searchDist);
   var searchMusic = $('input.music:checked').val();
   studyApp.getInfo(searchLoc, searchDist);
   musicApp.getInfo(searchMusic);
   $('html, body').animate({
     scrollTop: $('.printItems').offset().top
   }, 1500);
 })
 $('input').click(function() {
   $('input:not(:checked)').parent().removeClass('selected'); 
   $('input:checked').parent().addClass('selected');
 });
  studyApp.mapEvents();
};

studyApp.displayWalk = function(studyInfo) {
  // console.log(studyInfo[0].venue.location.distance);
  console.log(studyInfo);
  $('.printItems').empty();
  var $title = $('<h4>').text('Study Spots');
  var $notice = $('<p>').addClass('notice').text('Click on the picture to view map');
  $('.printItems').append($title, $notice);
  if (studyInfo.length == 0) {
    console.log('NO RESULTS!!! YOOOO!!!!');
    var $errorMsg = $('<p>').addClass('errorMsg').text('Sorry, no results have come back. Please try a different method of transportation (bike, drive).');
    var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($errorMsg);
    $('.printItems').append($singleItem);
  } else {
    $.each(studyInfo, function(i, study) {
      var $studyLocation = study.venue.location.lat + ',' + study.venue.location.lng;
      var $studyLat = study.venue.location.lat;
      var $studyLng = study.venue.location.lng;
      if (studyInfo[i].venue.location.distance < 1500) {
        if (study.venue.photos.groups.length == 0) {
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>'); 
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          var $photoContainer = $('<div>').addClass('photoContainer');
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $('.printItems').append($singleItem);
        } else {
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>');
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          //you can change the photo size to 100x100 too
          var $photo = $('<img>').attr('src',study.venue.photos.groups[0].items[0].prefix + '300x300' + study.venue.photos.groups[0].items[0].suffix);
          var $photoContainer = $('<div>').addClass('photoContainer').append($photo);
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $('.printItems').append($singleItem);
          $singleItem.data('latlng', $studyLocation);
          $singleItem.data('lat', $studyLat);
          $singleItem.data('lng', $studyLng);
        };
      };
    });
  };
};

studyApp.displayBike = function(studyInfo) {
  // console.log(studyInfo[0].venue.location.distance);
  console.log(studyInfo);
  $('.printItems').empty();
  var $title = $('<h4>').text('Study Spots');
  var $notice = $('<p>').addClass('notice').text('Click on the picture to view map');
  $('.printItems').append($title, $notice);
  if (studyInfo.length == 0) {
    console.log('NO RESULTS!!! YOOOO!!!!');
    var $errorMsg = $('<p>').addClass('errorMsg').text('Sorry, no results have come back. Please try a different method of transportation (walk, drive).');
    var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($errorMsg);
    $('.printItems').append($singleItem);
  } else {
    $.each(studyInfo, function(i, study) {
      var $studyLocation = study.venue.location.lat + ',' + study.venue.location.lng;
      var $studyLat = study.venue.location.lat;
      var $studyLng = study.venue.location.lng;
      if (studyInfo[i].venue.location.distance > 1500 && studyInfo[i].venue.location.distance < 5000) {
        if (study.venue.photos.groups.length == 0) {
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>');   
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          var $photoContainer = $('<div>').addClass('photoContainer');
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $('.printItems').append($singleItem);
        } else {
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>');  
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          //you can change the photo size to 100x100 too
          var $photo = $('<img>').attr('src',study.venue.photos.groups[0].items[0].prefix + '300x300' + study.venue.photos.groups[0].items[0].suffix);
          var $photoContainer = $('<div>').addClass('photoContainer').append($photo);
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $('.printItems').append($singleItem);
          $singleItem.data('latlng', $studyLocation);
          $singleItem.data('lat', $studyLat);
          $singleItem.data('lng', $studyLng);
        };
      };
    });
  };
};

studyApp.displayDrive = function(studyInfo) {
  // console.log(studyInfo[0].venue.location.distance);
  console.log(studyInfo);
  $('.printItems').empty();
  var $title = $('<h4>').text('Study Spots');
  var $notice = $('<p>').addClass('notice').text('Click on the picture to view map');
  $('.printItems').append($title, $notice);
  if (studyInfo.length == 0) {
    console.log('NO RESULTS!!! YOOOO!!!!');
    var $errorMsg = $('<p>').addClass('errorMsg').text('Sorry, no results have come back. Please try a different method of transportation (walk, bike).');
    var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($errorMsg);
    $('.printItems').append($singleItem);
  } else {
    $.each(studyInfo, function(i, study) {
      var $studyLocation = study.venue.location.lat + ',' + study.venue.location.lng;
      var $studyLat = study.venue.location.lat;
      var $studyLng = study.venue.location.lng;
      if (studyInfo[i].venue.location.distance > 5000) {
        //pass the search results into the google maps function
        studyApp.mapDisplay(studyInfo, studyApp.lat, studyApp.lng);
        if (study.venue.photos.groups.length == 0) {
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>');  
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          var $photoContainer = $('<div>').addClass('photoContainer');
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $('.printItems').append($singleItem);
        } else {
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>');  
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          //you can change the photo size to 100x100 too
          var $photo = $('<img>').attr('src',study.venue.photos.groups[0].items[0].prefix + '300x300' + study.venue.photos.groups[0].items[0].suffix);
          var $photoContainer = $('<div>').addClass('photoContainer').append($photo);
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $('.printItems').append($singleItem);
          $singleItem.data('latlng', $studyLocation);
          $singleItem.data('lat', $studyLat);
          $singleItem.data('lng', $studyLng);
        };
      };
    });
  };
};

studyApp.mapEvents = function() {
  $('.printContainer').on('click','.singleItem', function(){
    var $locLatLng = $(this).data('latlng');
    var $locLat = $(this).data('lat');
    var $locLng = $(this).data('lng');
    console.log($locLatLng);
    console.log($locLat);
    console.log($locLng);

    $('html,body').animate({scrollTop: $('.mapContainer').offset().top}, 800);

    studyApp.mapDisplay($locLatLng, $locLat, $locLng);
  });
};


studyApp.mapDisplay = function($locLatLng, $locLat, $locLng) {
  //console.log(mapItems);
  console.log('mapDisplay was initialized!')
  studyApp.getMap($locLatLng, $locLat, $locLng);
}; // end of mapDisplay

//MAP VARIABLES

// userLocation = new google.maps.LatLng(studyApp.lat, studyApp.lng);
// ryeLib = new google.maps.LatLng(43.657843882058906, -79.380544424057);
// directionsService = new google.maps.DirectionsService();

//SOME KIND OF MAP?????

studyApp.getMap = function($locLatLng, $locLat, $locLng) {
  console.log($locLatLng)
  //console.log(locLat);

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var isDraggable = false;
  } else {
    var isDraggable = true;
  }
  
  var mapOptions = {
    center: {lat: $locLat, lng: $locLng},
    zoom:18,
    scrollwheel: false,
    draggable: isDraggable,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  
  var marker = new google.maps.Marker({
    position: {lat: $locLat, lng: $locLng},
    animation: google.maps.Animation.BOUNCE
  });
  
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  marker.setMap(map);

  directionDisplay = new google.maps.DirectionsRenderer();
  directionDisplay.setMap(map);

};

// function calcRoute() {
//   var selectedMode = document.getElementById('mode').value;
//   var request = {
//     origin: userLocation,
//     destination: ryeLib,
//     travelMode: google.maps.TravelMode[selectedMode]
//   };

//   directionsService.route(request, function(response, status){
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionDisplay.setDirections(response);
//     }
//   });
// }

// google.maps.event.addDomListener(window, 'load', initialize);

// ===============

var musicApp = {};

// Call to get Foursquare results relating to the desire radius
musicApp.getInfo = function(genre){
  $.ajax({
      url : 'https://api.spotify.com/v1/search',
      // dataType : 'jsonp',
      type : 'GET',
      data : {
          client_id : 'de3105c7d73d4b4daad0f1b08ec2ce7f',
          client_secret : '65578e7d558b4c2fb7a649c9c7541ca8',
          // redirect_uri: 'http://localhost:8005/callback',
          q: 'study ' +  genre,
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

musicApp.displayMusic = function(playlists) { 
  console.log(playlists);
  $('.musicItems').empty();
  // var $title = $('<h4>').text('Study Playlists');
  // $('.musicItems').append($title);
  $.each(playlists, function(i, single) {
    var $name = $('<h3>').html('<a href ="'+ single.external_urls.spotify +'" target="_blank">'+ single.name + '</a>'); 
    var $photo = $('<img>').attr('src', single.images[0].url);
    // var $photoContainer = $('<div>').addClass('playlistPhoto').append($photo);
    // var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name);
    // var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
    var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($name, $photo);
    $('.musicItems').append($singleItem);
  });
};


studyApp.init = function() {
	studyApp.events();
  studyApp.getLocation();
  // musicApp.events();
};

$(document).ready(function(){
	studyApp.init();
  // musicApp.init();

  $('#upTop').on('click', function(){
        $('html,body').animate({scrollTop: $('body').offset().top}, 800);
    }); 
});