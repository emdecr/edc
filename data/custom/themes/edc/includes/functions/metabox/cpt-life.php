<?php
add_filter( 'rwmb_meta_boxes', 'life_meta_boxes' );
function life_meta_boxes( $meta_boxes) {
    $prefix = '_life_record_';

    // Site Intro
    $meta_boxes[] = array(
        'title'      => __( 'Record Details', 'textdomain' ),
        'post_types' => array( 'life-record'),
        'context'    => 'normal',
        'priority'   => '',
        'fields' => array(
            array(
                'id'   => $prefix . 'heading',
                'name' => __( 'Alt Heading', 'textdomain' ),
                'type' => 'textarea',
            ),
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