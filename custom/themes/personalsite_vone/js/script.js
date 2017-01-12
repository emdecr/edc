// // Send an email from our form
// $(function() {
// // When form is submitted get info
// 	$('form').on('submit', function(evnt) {
// 		evnt.preventDefault();
// 	// Store info in variables
// 		// Get name
// 		var fullname = $('#fullname').val();
// 		// Get email
// 		var email = $('#email').val();
// 		// Get content
// 		var content = $('#formcontent').val();
// 		// Send message to mandrill
// 		$.post('../wp-content/themes/personalsite_vone/email.php', {
// 			data : {
// 				message : {
// 					subject : 'Message from emilydelacruz.com!',
// 					text : content,
// 					from_name : fullname,
// 					from_email : email,
// 					to : [{
// 						email : 'hello@emilydelacruz.com',
// 						name : 'Emily Dela Cruz',
// 						type : 'to'
// 					}]
// 				}
// 			}
// 		}).then(function(res){
// 			var response = JSON.parse(res)[0];
// 				if(response.status === 'sent') {
// 					$('.modal').addClass('show success');
// 				}
// 				else {
// 					$('.modal').addClass('show error');
// 				}
// 		});
// 	// When we get the msg back
// 	//tell the user if it was successful or rejected
// 	});
// });