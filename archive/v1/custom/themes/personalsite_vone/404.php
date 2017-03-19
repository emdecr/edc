<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package Personal Site V1
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="error-404 not-found wrapper">
				<header class="page-header">
					<h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'personalsite_vone' ); ?></h1>
					<h2>Try another page. Please email me at '<strong><a href="mailto:hello@emilydelacruz.com">hello@emilydelacruz.com</a></strong>' if you have any questions.</h2>
				</header><!-- .page-header -->

				
			</section><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
