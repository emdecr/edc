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
  $('#submit').on('click', function(){
    var searchLoc = $('input.noiseLoc:checked').val();
    // console.log(searchLoc);
    var searchDist = $('input.transport:checked').val();
    // console.log(searchDist);
    studyApp.getInfo(searchLoc, searchDist);
  })

  $('.noiseLevel, .distanceType').toggleClass('selected');

  $('.printItems').on('click','.singleItem', function() {
    var $venueLatLng = $(this).data('latlng');
    var $venuesLat = $(this).data('lat');
    var $venuesLng = $(this).data('lng');
    console.log($venuesLat);

    studyApp.mapDisplay($venueLatLng, $venuesLat, $venuesLng);
  });
};

studyApp.displayWalk = function(studyInfo) {
  // console.log(studyInfo[0].venue.location.distance);
  console.log(studyInfo);
  $('.printContainer').empty();
  if (studyInfo.length == 0) {
    console.log('NO RESULTS!!! YOOOO!!!!');
    var $errorMsg = $('<p>').addClass('errorMsg').text('Sorry, no results have come back. Please try a different method of transportation (bike, drive).');
    var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($errorMsg);
    $('.printContainer').append($singleItem);
  } else {
    $.each(studyInfo, function(i, study) {
      if (studyInfo[i].venue.location.distance < 1500) {
        if (study.venue.photos.groups.length == 0) {
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>'); 
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          var $photoContainer = $('<div>').addClass('photoContainer');
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $('.printContainer').append($singleItem);
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
          $('.printContainer').append($singleItem);
        };
      };
    });
  };
};

studyApp.displayBike = function(studyInfo) {
  // console.log(studyInfo[0].venue.location.distance);
  console.log(studyInfo);
  $('.printContainer').empty();
  if (studyInfo.length == 0) {
    console.log('NO RESULTS!!! YOOOO!!!!');
    var $errorMsg = $('<p>').addClass('errorMsg').text('Sorry, no results have come back. Please try a different method of transportation (walk, drive).');
    var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($errorMsg);
    $('.printContainer').append($singleItem);
  } else {
    $.each(studyInfo, function(i, study) {
      if (studyInfo[i].venue.location.distance > 1500 && studyInfo[i].venue.location.distance < 5000) {
        if (study.venue.photos.groups.length == 0) {
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>');   
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          var $photoContainer = $('<div>').addClass('photoContainer');
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $('.printContainer').append($singleItem);
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
          $('.printContainer').append($singleItem);

        };
      };
    });
  };
};

studyApp.displayDrive = function(studyInfo) {
  // console.log(studyInfo[0].venue.location.distance);
  console.log(studyInfo);
  $('.printContainer').empty();
  if (studyInfo.length == 0) {
    console.log('NO RESULTS!!! YOOOO!!!!');
    var $errorMsg = $('<p>').addClass('errorMsg').text('Sorry, no results have come back. Please try a different method of transportation (walk, bike).');
    var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($errorMsg);
    $('.printContainer').append($singleItem);
  } else {
    $.each(studyInfo, function(i, study) {
      if (studyInfo[i].venue.location.distance > 5000) {
        //pass the search results into the google maps function
        // studyApp.mapDisplay(studyInfo, studyApp.lat, studyApp.lng);
        if (study.venue.photos.groups.length == 0) {
          var $venueLocation = study.venue.location.lat + ', ' + study.venue.location.lng;
          var $venueLattitude = study.venue.location.lat;
          var $venueLongitude = study.venue.location.lng;
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>');  
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          var $photoContainer = $('<div>').addClass('photoContainer');
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $singleItem.data('latlng', $venueLocation);
          $singleItem.data('lat', $venueLattitude);
          $singleItem.data('lng', $venueLongitude);
          $('.printContainer').append($singleItem);
        } else {
          var $venueLocation = study.venue.location.lat + ', ' + study.venue.location.lng;
          var $venueLattitude = study.venue.location.lat;
          var $venueLongitude = study.venue.location.lng;
          var $name = $('<h3>').html('<a href ="https://foursquare.com/v/'+ study.venue.id +'" target="_blank">'+ study.venue.name + '</a>');  
          var $location = $('<p>').text(study.venue.location.address);
          var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
          //you can change the photo size to 100x100 too
          var $photo = $('<img>').attr('src',study.venue.photos.groups[0].items[0].prefix + '300x300' + study.venue.photos.groups[0].items[0].suffix);
          var $photoContainer = $('<div>').addClass('photoContainer').append($photo);
          var $itemInnerInfo = $('<div>').addClass('itemInnerInfo').append($name, $location, $distance);
          var $itemInfo = $('<div>').addClass('itemInfo').append($itemInnerInfo, $photoContainer);
          var $singleItem = $('<div>').addClass('singleItem', 'clearfix').append($itemInfo);
          $('.printContainer').append($singleItem);
          $('.singleItem').data('latlng', $venueLocation);
          $('.singleItem').data('lat', $venueLattitude);
          $('.singleItem').data('lng', $venueLongitude);
        };
      };
    });
  };
};

studyApp.mapDisplay = function(placeLatLng, placeLat, placeLng) {
  // console.log(mapItems);
  console.log('mapDisplay was initialized!')
  //MAP VARIABLES

  userLocation = new google.maps.LatLng(43.657843882058906, -79.380544424057);
  ryeLib = new google.maps.LatLng(placeLatLng);
  directionsService = new google.maps.DirectionsService();

  //SOME KIND OF MAP?????

  function initialize() {
    var mapOptions = {
      center: userLocation,
      zoom:15,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    
    var marker = new google.maps.Marker({
      position: userLocation,
    });
    
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    marker.setMap(map);

    directionDisplay = new google.maps.DirectionsRenderer();
    directionDisplay.setMap(map);

  };

  function calcRoute() {
    var selectedMode = document.getElementById('mode').value;
    var request = {
      origin: userLocation,
      destination: ryeLib,
      travelMode: google.maps.TravelMode[selectedMode]
    };

    directionsService.route(request, function(response, status){
      if (status == google.maps.DirectionsStatus.OK) {
        directionDisplay.setDirections(response);
      }
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
}; // end of mapDisplay

studyApp.init = function() {
	studyApp.events();
  studyApp.getLocation();
};

$(document).ready(function(){
	studyApp.init();

});