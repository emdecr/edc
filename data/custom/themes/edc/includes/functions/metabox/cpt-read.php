<?php
add_filter( 'rwmb_meta_boxes', 'read_meta_boxes' );
function read_meta_boxes( $meta_boxes) {
    $prefix = '_read_';

    $meta_boxes[] = array(
        'title'      => __( 'Details', 'textdomain' ),
        'post_types' => array( 'read'),
        'context'    => 'normal',
        'priority'   => '',
        'fields' => array(
            array(
                'id'   => $prefix . 'link',
                'name' => __( 'External Link', 'textdomain' ),
                'type' => 'text',
            ),
            array(
                'id'   => $prefix . 'highlights',
                'name' => __( 'Highlights', 'textdomain' ),
                'type' => 'wysiwyg',
            ),
        ),
    );

    return $meta_boxes;
}
?>