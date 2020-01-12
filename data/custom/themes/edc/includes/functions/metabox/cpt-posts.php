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
                'id'   => $prefix . 'subtitle',
                'name' => __( 'Subtitle', 'textdomain' ),
                'type' => 'text',
            ),
            array(
                'id'   => $prefix . 'link',
                'name' => __( 'External Link', 'textdomain' ),
                'type' => 'text',
            ),
        ),
    );

    $meta_boxes[] = array(
        'title'      => __( 'Footnotes', 'textdomain' ),
        'post_types' => array( 'post', 'project' ),
        'context'    => 'normal',
        'fields' => array(
            array (
                'id' => $prefix . 'footnotes',
                'type' => 'group',
                'clone' => 1,
                'sort_clone' => true,
                'default_state' => 'expanded',
                'collapsible' => true,
                'group_title' => 'Footnote {#}',
                'save_state' => true,
                'fields' =>       array (
                    array (
                        'id' => 'footnote',
                        'type' => 'wysiwyg',
                    ),
                ),
            ),
        ),
    );

    return $meta_boxes;
}
?>