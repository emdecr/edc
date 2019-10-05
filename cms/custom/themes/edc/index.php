<?php get_header(); ?>

<section>
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <p>Hello world! - Index.php</p>
    <?php endwhile; else : ?>
        <p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
    <?php endif; ?>
</section>


<?php get_footer(); ?>