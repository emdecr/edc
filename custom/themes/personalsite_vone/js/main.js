$(document).ready(function() {

// $(window).scroll(function () {

//     var scrollTop = $(window).scrollTop();
//     var height = $(window).height();

//     $('.textFade').css({
//         'opacity': ((height - scrollTop) / height);
//     }); 
// });

$(function() {
    $(window).scroll( function(){
    
       
        $('.fadeInItem').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            // The lower '100' is, the longer it takes to fade in
            bottom_of_window = bottom_of_window + 100;  
          
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},500);
                    
            }
        }); 
    
    });
});


});

