<?php
add_filter( 'rwmb_meta_boxes', 'shelf_meta_boxes' );
function shelf_meta_boxes( $meta_boxes) {
    $prefix = '_shelf_item_';

    // Site Intro
    $meta_boxes[] = array(
        'title'      => __( 'Item Details', 'textdomain' ),
        'post_types' => array( 'shelf-item'),
        'context'    => 'normal',
        'priority'   => '',
        'fields' => array(
            array(
                'id'   => $prefix . 'link',
                'name' => __( 'Link', 'textdomain' ),
                'type' => 'text',
            ),
        ),
    );

    return $meta_boxes;
}
?>