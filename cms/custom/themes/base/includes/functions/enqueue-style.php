<?php

/**
* Enqueue styles
*/

function my_styles() {
	wp_enqueue_style( 'material', 'https://fonts.googleapis.com/icon?family=Material+Icons', false);
	wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css?family=Droid+Serif:400,700|Montserrat:400,700', false );
	wp_register_style('style', get_template_directory_uri() . '/dist/css/style.css');
 	wp_enqueue_style( 'style' );
}

add_action('wp_enqueue_scripts', 'my_styles');

?>