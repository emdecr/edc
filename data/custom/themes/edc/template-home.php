<?php
/**
* Template Name: Home
*/
get_header(); 
if ( have_posts() ) : while ( have_posts() ) : the_post();?>

   <?php endwhile; else : ?>
   <?php endif; ?>

<?php get_footer(); ?>