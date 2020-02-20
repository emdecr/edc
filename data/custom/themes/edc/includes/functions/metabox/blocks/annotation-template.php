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
    <?php echo mb_get_block_field( 'annotation_text' ) ?>
    </div>
    <div class="annotation-body">
        <div class="annotation-note">
        <?php echo mb_get_block_field( 'annotation_note' ) ?>
        </div>
        <div class="annotation-themes">
        <ul>
            <?php 
            $themes = $attribute['data']['annotation_themes'];
            if (is_array($themes) || is_object($themes))
            {
                foreach ($themes as $t)
                { 
                    $term = get_term( $t, 'theme' );
                    ?>
                <li><?php echo $term->name;?></li>
                <?php }
            }?>
        </ul>
        </div>
    </div>
</div>