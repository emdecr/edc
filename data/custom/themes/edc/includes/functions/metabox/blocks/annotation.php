<?php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title'           => 'Annotation',
		'id'              => 'annotation',
		'description'     => 'A paragraph block with an attached annotation',
		'type'            => 'block',
		'icon'            => 'admin-comments',
		'category'        => 'layout',
		'context'         => 'side',
		'render_template' => get_template_directory() . '/includes/functions/metabox/blocks/annotation-template.php',
		// 'enqueue_style'   => get_template_directory_uri() . '/includes/functions/metabox/blocks/annotation.css',
		'supports' => [
            'align'           => ['wide', 'full'],
            'customClassName' => true,
            'anchor'          => true,
        ],

		// Block fields.
		'fields'          => [
			[
				'type' => 'wysiwyg',
				'id'   => 'annotation_text',
				'name' => 'Text',
            ],
            [
				'type' => 'wysiwyg',
				'id'   => 'annotation_note',
				'name' => 'Note',
            ],
            [
                'name'       => 'Themes',
                'id'         => 'annotation_text',
                'type'       => 'taxonomy_advanced',

                // Taxonomy slug.
                'taxonomy'   => 'theme',

                // How to show taxonomy.
                'field_type' => 'select_advanced',
            ]
		],
	];
	return $meta_boxes;
} );
?>