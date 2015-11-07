<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Personal Site V1
 */

?>

	</div><!-- #content -->
</div><!-- #page -->

<?php wp_footer(); ?>
<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<p class="rights">Designed and Developed by Emily Dela Cruz &copy; 2015.</p>
		</div><!-- .site-info -->
</footer><!-- #colophon -->
<style>

.homeHeaderMain {
	background-image: url('<?php the_field( 'hero_image' ); ?>');
}

.emilyBio,
.featProjects,
.homeContact {
	background-image: url('<?php the_field( 'middle_hero' ); ?>');
}

@media (max-width: 500px) {

.homeHeaderMain,
.emilyBio,
.featProjects,
.homeContact {
	background-color: #000;
	background-image: url('<?php the_field( 'mobile_background' ); ?>');
}

}
	
</style>
</body>
</html>

<!-- <a href="<?php echo esc_url( __( 'http://wordpress.org/', 'personalsite_vone' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'personalsite_vone' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'personalsite_vone' ), 'personalsite_vone', '<a href="http://emilydelacruz.com" rel="designer">Emily Dela Cruz</a>' ); ?> -->
