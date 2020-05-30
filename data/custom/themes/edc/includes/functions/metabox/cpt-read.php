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
                'name'   => 'Author',
                'id'     => 'authors',
                'type'   => 'group',
                'collapsible' => true,
                'group_title' => array( 'field' => 'last_name' ), 
                'save_state' => false,
                // List of sub-fields
                'fields' => array(
                    array(
                        'name' => 'First Name',
                        'id'   => 'first_name',
                        'type' => 'text',
                    ),
                    array(
                        'name' => 'Last Name',
                        'id'   => 'last_name',
                        'type' => 'text',
                    )
                ),
            ),
            array(
                'name'   => 'Editor',
                'id'     => 'editors',
                'type'   => 'group',
                'collapsible' => true,
                'clone'  => true,
                'group_title' => array( 'field' => 'last_name' ), 
                'save_state' => false,
                // List of sub-fields
                'fields' => array(
                    array(
                        'name' => 'First Name',
                        'id'   => 'first_name',
                        'type' => 'text',
                    ),
                    array(
                        'name' => 'Last Name',
                        'id'   => 'last_name',
                        'type' => 'text',
                    )
                ),
            ),
            array(
                'id'   => $prefix . 'publisher',
                'name' => __( 'Publisher', 'textdomain' ),
                'type' => 'text',
            ),
            array(
                'id'   => $prefix . 'date',
                'name' => __( 'Release Date', 'textdomain' ),
                'type' => 'text',
            ),
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