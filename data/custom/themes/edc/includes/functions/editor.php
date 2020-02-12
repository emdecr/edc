<?php
// Load in custom css for the editor
function custom_editor_styles() {
    add_editor_style( get_template_directory_uri() . '/dist/css/editor.css');
}
    
add_action( 'admin_init', 'custom_editor_styles' );

// Add downdown button to editor
function add_style_select_button($buttons) {
    array_unshift($buttons, 'styleselect');
    return $buttons;
}

add_filter('mce_buttons_2', 'add_style_select_button');

// Add custom styles to the WordPress editor
function my_mce_before_init_insert_formats( $init_array ) {

    $style_formats = array(
        // These are the custom styles
        array(
            'title' => 'Highlight',
            'inline' => 'span',
            'classes' => 'highlight',
            'wrapper' => true,
        ),
    );
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );
    
    return $init_array;
    
}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );
