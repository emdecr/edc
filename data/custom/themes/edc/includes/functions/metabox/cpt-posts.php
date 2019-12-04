<?php
add_filter( 'rwmb_meta_boxes', 'posts_meta_boxes' );
function posts_meta_boxes( $meta_boxes) {
    $prefix = '_post_';
    
    $meta_boxes[] = array(
        'title'      => __( 'Post Details', 'textdomain' ),
        'post_types' => array( 'post'),
        'context'    => 'normal',
        'priority'   => '',
        'fields' => array(
            array(
                'id'   => $prefix . 'link',
                'name' => __( 'External Link', 'textdomain' ),
                'type' => 'text',
            ),
        ),
    );

    return $meta_boxes;
}
?>