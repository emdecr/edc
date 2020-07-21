<?php
add_filter( 'rwmb_meta_boxes', 'note_meta_boxes' );
function note_meta_boxes( $meta_boxes) {
    $prefix = '_note_';

    $meta_boxes[] = array(
        'title'      => __( 'Note Details', 'textdomain' ),
        'post_types' => array( 'note'),
        'context'    => 'normal',
        'fields' => array(
            array(
                'name'        => 'Related posts',
                'id'   => $prefix . 'related',
                'type'        => 'post',
            
                // Post type.
                'post_type'   => 'read',
            
                // Field type.
                'field_type'  => 'select_advanced',
                'multiple'    => true,
            
                // Placeholder, inherited from `select_advanced` field.
                'placeholder' => 'Select a post',
            
                // Query arguments. See https://codex.wordpress.org/Class_Reference/WP_Query
                'query_args'  => array(
                    'post_status'    => array('publish', 'draft', 'future'),
                    'posts_per_page' => - 1,
                ),
            ),
        ),
    );

    return $meta_boxes;
}
?>