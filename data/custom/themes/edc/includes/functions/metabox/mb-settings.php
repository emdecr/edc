<?php
// Register settings page. In this case, it's a theme options page
add_filter( 'mb_settings_pages', 'edc_options_page' );
function edc_options_page( $settings_pages ) {
    $settings_pages[] = array(
        'id'            => 'edc_ops',
        'option_name'   => 'edc_ops',
        'menu_title'    => 'edc settings',
        'icon_url'      => 'dashicons-admin-generic',
        'style'         => 'no-boxes',
        'columns'       => 1,
        'tabs'          => array(
            'general'   => 'General',
            'footer'    => 'Footer',
            'api'       => 'API',
            'pinterest' => 'Pinterest',
            'weather'   => 'Weather'
        ),
        'position'      => 68,
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
                'name' => 'Life API Key',
                'id'   => 'life_api_key',
                'type' => 'text',
            ),
        ),
        'fields' => array(
            array(
                'name' => '?',
                'id'   => 'knock_three_times',
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
                'type' => 'text',
                'attributes' => array(
                    'disabled'  => true,
                    'readonly'  => true,
                ),
            ),
            array(
                'name' => 'Data',
                'id'   => 'pin_data',
                'type' => 'textarea',
                'attributes' => array(
                    'disabled'  => true,
                    'readonly'  => true,
                ),
            ),
            array(
                'name' => 'Refresh?',
                'id'   => 'pin_refresh',
                'type' => 'checkbox'
            ),
        ),
    );

    $meta_boxes[] = array(
        'id'             => 'weather',
        'title'          => 'Weather Data',
        'settings_pages' => 'edc_ops',
        'tab'            => 'weather',
        'fields'         => array(
            array(
                'name' => 'Date/Time',
                'id'   => 'weather_date_time',
                'type' => 'text',
                'attributes' => array(
                    'disabled'  => true,
                    'readonly'  => true,
                ),
            ),
            array(
                'name' => 'Weather Data',
                'id'   => 'weather_data',
                'type' => 'textarea',
                'attributes' => array(
                    'disabled'  => true,
                    'readonly'  => true,
                ),
            ),
            array(
                'name' => 'Refresh?',
                'id'   => 'weather_refresh',
                'type' => 'checkbox'
            ),
        ),
    );
    return $meta_boxes;
}
?>