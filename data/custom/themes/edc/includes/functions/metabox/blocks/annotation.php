<?php
function mb_annotation_callback( $attributes, $is_preview = false, $post_id = null ) {
	// Fields data.
	if ( empty( $attributes['data'] ) ) {
		return;
	}
	
	// Unique HTML ID if available.
	$id = 'annotation-' . ( $attributes['id'] ?? '' );
	if ( ! empty( $attributes['anchor'] ) ) {
		$id = $attributes['anchor'];
	}

	// Custom CSS class name.
	$class = 'annotation ' . ( $attributes['className'] ?? '' );
	if ( ! empty( $attributes['align'] ) ) {
		$class .= " align{$attributes['align']}";
	}
	?>
	<div id="<?= $id ?>" class="<?= $class ?>">
		<div class="annotation-text">
		<?php mb_the_block_field( 'annotation_text' ) ?>
		</div>
		<div class="annotation-body">
			<div class="annotation-note">
			<?php mb_the_block_field( 'annotation_note' ) ?>
			</div>
			<div class="annotation-themes">
				
			</div>
		</div>
	</div>
<?php }

add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title'           => 'Annotation',
		'id'              => 'annotation',
		'description'     => 'A paragraph block with an attached annotation',
		'type'            => 'block',
		'keywords' 		  => ['annotation'],
		'icon'            => 'admin-comments',
		'category'        => 'layout',
		'render_template' => get_template_directory() . '/includes/functions/metabox/blocks/annotation-template.php',
		'render_callback' => 'mb_annotation_callback',
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
				'type' => 'textarea',
				'id'   => 'annotation_note',
				'name' => 'Note',
            ],
            [
                'name'       => 'Themes',
                'id'         => 'annotation_themes',
				'type'       => 'taxonomy_advanced',
				'multiple'   => true,

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