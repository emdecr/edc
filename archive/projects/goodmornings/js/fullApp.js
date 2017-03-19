// ================= SEARCH CUES
var cues = [
'creativity',
'fear',
'ambition',
'connect',
'personality',
'education',
'science',
'technology',
'art',
'music',
'photography',
'food',
'politics',
'dance',
'film',
'writing',
'dreams',
'awareness',
'social media',
'psychology'
]

var num1 = Math.floor(Math.random() * 19);
var num2 = Math.floor(Math.random() * 19);
var num3 = Math.floor(Math.random() * 19);
var num4 = Math.floor(Math.random() * 19);

if ((num1 !== num2 && num1 !== num3 && num1 !== num4) && 
(num2 !== num1 && num2 !== num3 && num2 !== num4) &&
(num3 !== num1 && num3 !== num2 && num3 !== num4) &&
(num4 !== num1 && num4 !== num2 && num4 !== num3)) {
	$('.searchCues').text(cues[num1]+', '
	+cues[num2]+', '
	+cues[num3]+', '
	+cues[num4]);
} else {
	console.log('Default search cues.');
};

// ============== TED TALKS ================

var tedTalkApp = {
};

tedTalkApp.getInfo = function(query) {
	$.ajax({
		url : 'https://api.ted.com/v1/search.json',
		dataType : 'jsonp',
		type : 'GET',
		data : {
			q : query,
			categories : 'talks',
			limit : 20,
			'api-key' : 'cd4xktdmjzbgzj6dbguramyh'
			//This is my personal key
			//PLEASE OBTAIN AND USE YOUR OWN KEYS <3
		},
		success: function(res) {
			console.log(res);
			if (res.results.length == 0) {
				tedTalkApp.noInfo();
			  console.log('No TED Talks coming back - sorry.');
			} else {
			   tedTalkApp.displayInfo(res.results[0]);
			   tedTalkApp.displayInfo(res.results[1]);
			   tedTalkApp.displayInfo(res.results[Math.floor(Math.random() * (res.results.length - 2) + 2)]);
			   tedTalkApp.displayInfo(res.results[Math.floor(Math.random() * (res.results.length - 2) + 2)]);
			}
			
		}
	});
};

tedTalkApp.events = function() {
	// Apply a submit event listeniner to the form
	//with a class of search
	$('.search').on('submit', function(e) {
		e.preventDefault();
		// Make the hidden sections visible
		$('#tedTalks').removeClass('hidden');
		$('#bookRecs').removeClass('hidden');
		$('#showSearch').removeClass('hidden');
		// Get the entered user input
		var vidQuery = $(this).find('input[type=search]').val();
		console.log(vidQuery);
		//Display the search query
		$('#showTerm').html('<h2>"'+vidQuery+'"</h2>');
		// Pass that value to the app.getInfo method
		tedTalkApp.getInfo(vidQuery);
		// clear #talkContainer if user makes another search
		$('#talkContainer').empty();
				// on submit - scroll down to results
		$('html, body').animate({
         scrollTop: $('#tedTalks').offset().top
    	}, 1500);
	});
};
tedTalkApp.init = function() {
	tedTalkApp.events();
};

tedTalkApp.noInfo = function() {
	//if no results come up
		var $descrip = $('<p>').addClass('errorBox').html('Sorry, your search returned no TED Talks results (though there may be some books below...)! <br/>Please search again!');
		var $noBox = $('<div>').addClass('talkHolder', 'clearfix').append($descrip);
		
		$('#talkContainer').append($noBox);
	console.log('No info message working!');
};


tedTalkApp.displayInfo = function(apiData) {
	$.each(apiData, function(i, item) {
		var $title = $('<a href="https://www.ted.com/talks/'+item.slug+'" class="titleLink" target="_blank"><h2 class="talkTitleTed">'+item.name+'</h2></a>');
		var $descrip = $('<p>').addClass('talkDescrip').html(item.description);
		var $video = $('<div>').addClass('talkVideo').html('<iframe src="https://embed-ssl.ted.com/talks/'+item.slug+'.html" width="640" height="360" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
		var $talkBox = $('<div>').addClass('talkHolder', 'clearfix').append($title, $video, $descrip);
		
		$('#talkContainer').append($talkBox);
	});
	console.log(apiData);
	console.log('Data is coming back!')
};

tedTalkApp.init = function() {
	tedTalkApp.events();
};

// ================= GOOGLE BOOKS ==============

var gBookApp = {
};

gBookApp.getInfo = function(query) {
	$.ajax({
		url: 'https://www.googleapis.com/books/v1/volumes?',
		type: 'GET',
		data : {
			q : query,
			maxResults: 20,
			// orderBy : 'newest',
			key : 'AIzaSyAceH9P3iLh5CdQezbeFelD2O-GnWj-47Y'
		},
		success: function(res) {
			// console.log(res);
			gBookApp.displayInfo(res.items[0]);
			gBookApp.displayInfo(res.items[1]);
			gBookApp.displayInfo(res.items[Math.floor(Math.random() * (res.items.length - 2) + 2)]);
			gBookApp.displayInfo(res.items[Math.floor(Math.random() * (res.items.length - 2) + 2)]);
		}
	});
};

gBookApp.getMoreBooks = function(query) {
	$.ajax({
		url: 'https://www.googleapis.com/books/v1/volumes?',
		type: 'GET',
		data : {
			q : query,
			maxResults: 40,
			orderBy : 'newest',
			key : 'AIzaSyAceH9P3iLh5CdQezbeFelD2O-GnWj-47Y'
		},
		success: function(res) {
			// console.log(res);
			gBookApp.displayInfo(res.items[Math.floor(Math.random() * res.items.length)]);
			gBookApp.displayInfo(res.items[Math.floor(Math.random() * res.items.length)]);
			gBookApp.displayInfo(res.items[Math.floor(Math.random() * res.items.length)]);
			gBookApp.displayInfo(res.items[Math.floor(Math.random() * res.items.length)]);
		}
	});
};

gBookApp.events = function() {
	// Apply a submit event listeniner to the form
	//with a class of search
	$('.search').on('submit', function(e) {
		e.preventDefault();
		// Get the entered user input
		var searchQuery = $(this).find('input[type=search]').val();
		// console.log(searchQuery);
		// Pass that value to the app.getInfo method
		gBookApp.getInfo(searchQuery);
		// Clear search value
		$(this).find('input[type=search]').val('');
		// //AND clear #talkContainer if user makes another search
		$('#bookContainer').empty();
		// Load more books when #loadMoreBooks div is clicked
		$('#loadMoreBooks').on('click', function() {
			// Pass that value to the app.getMoreBooks method
			gBookApp.getMoreBooks(searchQuery);
		});
	});
};

gBookApp.displayInfo = function(apiData) {
	if (apiData.searchInfo !== undefined) {
		var $title = $('<a target="_blank" href="'+apiData.volumeInfo.infoLink+'" class="bookLink"><h2 class="bookTitle">'+apiData.volumeInfo.title+'</h2></a>');
		var $subtitle = $('<p>').addClass('bookSubT').text(apiData.volumeInfo.subtitle);
		var $author = $('<p>').addClass('bookAuthor').text(apiData.volumeInfo.authors);
		var $snippet = $('<p>').addClass('bookSnippet').html(apiData.searchInfo.textSnippet);
		var $cover = $('<img></img>').attr('src', apiData.volumeInfo.imageLinks.thumbnail);
		var $book = $('<div>').addClass('bookHolder clearfix').append($title, $subtitle, $author, $cover, $snippet);

		$('#bookContainer').append($book);
	} else if (apiData.searchInfo == undefined) {
		var $title = $('<a target="_blank" href="'+apiData.volumeInfo.infoLink+'" class="bookLink"><h2 class="bookTitle">'+apiData.volumeInfo.title+'</h2></a>');
		var $subtitle = $('<p>').addClass('bookSubT').text(apiData.volumeInfo.subtitle);
		var $author = $('<p>').addClass('bookAuthor').text(apiData.volumeInfo.authors);
		// var $snippet = $('<p>').addClass('bookSnippet').html(apiData.searchInfo.textSnippet);
		var $cover = $('<img></img>').attr('src', apiData.volumeInfo.imageLinks.thumbnail);
		var $book = $('<div>').addClass('bookHolder clearfix').append($title, $subtitle, $author, $cover);

		$('#bookContainer').append($book);
	} else {
		var $title = $('<a target="_blank" href="'+apiData.volumeInfo.infoLink+'" class="bookLink"><h2 class="bookTitle">'+apiData.volumeInfo.title+'</h2></a>');
		var $subtitle = $('<p>').addClass('bookSubT').text(apiData.volumeInfo.subtitle);
		var $author = $('<p>').addClass('bookAuthor').text(apiData.volumeInfo.authors);
		// var $snippet = $('<p>').addClass('bookSnippet').html(apiData.searchInfo.textSnippet);
		var $cover = $('<img></img>').attr('src', apiData.volumeInfo.imageLinks.thumbnail);
		var $book = $('<div>').addClass('bookHolder clearfix').append($title, $subtitle, $author, $cover);

		$('#bookContainer').append($book);
	};
	// console.log(apiData);
}; 

gBookApp.init = function() {
	gBookApp.events();
};


// ================ INTIALIZE ================

$(document).ready(function() {
  tedTalkApp.init();
  gBookApp.init();
  $('#upTop').on('click', function(){
        $('html,body').animate({scrollTop: $('body').offset().top}, 800);
    }); 
});
