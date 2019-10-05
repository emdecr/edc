<?php
// Register settings page. In this case, it's a theme options page
add_filter( 'mb_settings_pages', 'edc_options_page' );
function edc_options_page( $settings_pages ) {
    $settings_pages[] = array(
        'id'          => 'edc_ops',
        'option_name' => 'edc_ops',
        'menu_title'  => 'edc Settings',
        'icon_url'    => 'dashicons-admin-generic',
        'style'       => 'no-boxes',
        'columns'     => 1,
        'tabs'        => array(
            'general' => 'General',
            'footer'  => 'Footer',
            'api'     => 'API',
            'pinterest' => 'Pinterest'
        ),
        'position'    => 68,
    );
    return $settings_pages;
}

// Register meta boxes and fields for settings page
add_filter( 'rwmb_meta_boxes', 'edc_options_meta_boxes' );
function edc_options_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'id'             => 'general',
        'title'          => 'General',
        'settings_pages' => 'edc_ops',
        'tab'            => 'general',

        'fields' => array(
            array(
                'name' => 'Logo',
                'id'   => 'logo',
                'type' => 'image_advanced',
            ),
        ),
    );

    $meta_boxes[] = array(
        'id'             => 'api',
        'title'          => 'APIs',
        'settings_pages' => 'edc_ops',
        'tab'            => 'api',

        'fields' => array(
            array(
                'name' => 'API Key',
                'id'   => 'api_key',
                'type' => 'text',
            ),
        ),
    );

    $meta_boxes[] = array(
        'id'             => 'footer',
        'title'          => 'Footer',
        'settings_pages' => 'edc_ops',
        'tab'            => 'footer',

        'fields' => array(
            array(
                'name' => 'Funder Logo',
                'id'   => 'sponsor_logo',
                'type' => 'image_advanced',
            ),
            array(
                'name' => 'Funder Copy',
                'id'   => 'sponsor_copy',
                'type' => 'wysiwyg',
            ),
        ),
    );

    $meta_boxes[] = array(
        'id'             => 'pinterest',
        'title'          => 'Pinterest Data',
        'settings_pages' => 'edc_ops',
        'tab'            => 'pinterest',
        'fields'         => array(
            array(
                'name' => 'Date/Time',
                'id'   => 'pin_date_time',
                'type' => 'text'
            ),
            array(
                'name' => 'Data',
                'id'   => 'pin_data',
                'type' => 'textarea'
            ),
        ),
    );
    return $meta_boxes;
}
?>