<?php
add_filter( 'rwmb_meta_boxes', 'pages_meta_boxes' );
function pages_meta_boxes( $meta_boxes) {
    $prefix = '_page_';

    $meta_boxes[] = array(
        'title'      => __( 'Skills', 'textdomain' ),
        'post_types' => array( 'page' ),
        'context'    => 'normal',
        'include' => array(
            'template'        => array( 'template-about.php' )
        ),
        'fields' => array(
            array (
                'id' => $prefix . 'skills',
                'type' => 'group',
                'clone' => true,
                'sort_clone' => true,
                'default_state' => 'collapsed',
                'collapsible' => true,
                'group_title' => 'Skill {#}',
                'save_state' => false,
                'fields' =>       array (
                    array (
                        'name' => __( 'Label' ),
                        'id' => 'label',
                        'type' => 'text',
                    ),
                ),
            ),
            array (
                'id' => $prefix . 'learning',
                'type' => 'group',
                'clone' => true,
                'sort_clone' => true,
                'default_state' => 'collapsed',
                'collapsible' => true,
                'group_title' => 'Learning {#}',
                'save_state' => false,
                'fields' =>       array (
                    array (
                        'name' => __( 'Label' ),
                        'id' => 'label',
                        'type' => 'text',
                    ),
                ),
            ),
        ),
    );

    return $meta_boxes;
}
?>