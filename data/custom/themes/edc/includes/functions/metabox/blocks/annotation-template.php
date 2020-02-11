<?php
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
$classes = 'annotation-block ' . ( $attributes['className'] ?? '' );

?>
<div id="<?= $id ?>" class="<?= $classes ?>">
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