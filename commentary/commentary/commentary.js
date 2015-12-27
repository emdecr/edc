//'Commentary' was created by Emily Dela Cruz
	// http://emilydelacruz.com
// Fork this on GitHub
	// https://github.com/emdecr/commentary

$('.cmmtBub').hide();

$.fn.commentaryOn = function() {
	
	// when you click the on button – commentary shows
	$(this).on('click', function() {

		//For the next two lines of code:
			// Replace #offButton with the id of whatever
				//element you are using to turn on COMMENTARY
			// If your 'turn on' element is an image or
				//something that does not need a background
				//color, just delete/comment out these two line
		$(this).css('background-color', 'lightgrey');
		$('#offButton').css('background-color', '#fff');

		// ---

		$('.cmmtRef').addClass('highlight');

		$('.highlight').on('mouseover', function() {
			$(this).css('cursor', 'help');
		});

		// only when the text is highlighted
		// when the user mouseovers, show commentary bubble
		$('.highlight').on('click', function() {
			$(this).css('cursor', 'help');
			$(this).next('.cmmtBub').show(700);
		});

	}); //end of on-click for onButton

};

$.fn.commentaryOff = function() {

	// when you click the off button - commentary disappears
	$(this).on('click', function() {

		//!!! For the next two lines of code:
			// Replace #offButton with the id of whatever
				//element you are using to turn off COMMENTARY
			// If your 'turn on' element is an image or
				//something that does not need a background
				//color, just delete/comment out these two line
		$(this).css('background-color', 'lightgrey');
		$('#onButton').css('background-color', '#fff');

		// ---

		$('.cmmtBub').hide(1000); 

		// ---

		$('.cmmtRef').removeClass('highlight');
		$('.cmmtRef').addClass('noHighlight');

		$('.noHighlight').on('mouseover', function() {
			$(this).css('cursor', 'auto');
		});

		$('.noHighlight').on('click', function() {
			$(this).css('cursor', 'auto');
			$(this).next('.cmmtBub').hide();
		});

	}); //end of on-click for offButton

};