<?php
add_filter( 'rwmb_meta_boxes', 'project_meta_boxes' );
function project_meta_boxes( $meta_boxes) {
    $prefix = '_project_';

    $meta_boxes[] = array(
        'title'      => __( 'Project Details', 'textdomain' ),
        'post_types' => array( 'project'),
        'context'    => 'normal',
        'priority'   => '',
        'fields' => array(
            array(
                'id'   => $prefix . 'subtitle',
                'name' => __( 'Subtitle', 'textdomain' ),
                'type' => 'textarea',
            ),
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