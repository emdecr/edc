<?php
add_filter( 'rwmb_meta_boxes', 'pages_meta_boxes' );
function pages_meta_boxes( $meta_boxes) {
    $prefix = '_page_';

    $meta_boxes[] = array(
        'title'      => __( 'Resume', 'textdomain' ),
        'post_types' => array( 'page' ),
        'context'    => 'normal',
        'include' => array(
            'template'        => array( 'template-about.php' )
        ),
        'fields' => array(
            array(
                'id'   => $prefix . 'resume',
                'name' => __( 'Link', 'textdomain' ),
                'type' => 'text',
            ),
            array(
                'id'   => $prefix . 'resume_file',
                'name' => __( 'Upload', 'textdomain' ),
                'type' => 'file_input',
            ),
        ),
    );

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
            array(
                'id'   => $prefix . 'skills_title',
                'name' => __( 'Skills Title', 'textdomain' ),
                'type' => 'text',
            ),
            array(
                'id'   => $prefix . 'skills_text',
                'name' => __( 'Skills Text', 'textdomain' ),
                'type' => 'wysiwyg',
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
                    array (
                        'name' => __( 'Course Name' ),
                        'id' => 'course_name',
                        'type' => 'text',
                    ),
                    array (
                        'name' => __( 'Course Link' ),
                        'id' => 'course_link',
                        'type' => 'text',
                    ),
                    array (
                        'name' => __( 'Course %' ),
                        'id' => 'course_percent',
                        'type' => 'text',
                    ),
                ),
            ),
            array(
                'id'   => $prefix . 'learning_title',
                'name' => __( 'Learning Title', 'textdomain' ),
                'type' => 'text',
            ),
            array(
                'id'   => $prefix . 'learning_text',
                'name' => __( 'Learning Text', 'textdomain' ),
                'type' => 'wysiwyg',
            ),
        ),
    );

    return $meta_boxes;
}
?>