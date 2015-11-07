<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Personal Site V1
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<!-- FONTS -->
<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans:100,200,300,400,700|Karla:400,400italic,700,700italic|Montserrat:400,700|Oswald:300,400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

<!-- CSS -->
<!-- <link rel="stylesheet" href="style.css"> -->

<!-- JS -->
<!-- <script src="js/modernizr.custom.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/flickity/1.0.0/flickity.pkgd.js"></script> -->

<!-- FAVICON -->
<link rel="icon" type="image" href="images/favicon.ico">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site animated fadeIn">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'personalsite_vone' ); ?></a>

	<div class="wrapper">
		<header id="masthead" class="site-header" role="banner">
			<div class="site-branding">
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<!-- <h2 class="site-description"><?php bloginfo( 'description' ); ?></h2> -->
			</div><!-- .site-branding -->
		
			<nav id="site-navigation" class="main-navigation" role="navigation">
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
			</nav><!-- #site-navigation -->
		</header><!-- #masthead -->
	</div>

	<div id="content" class="site-content">
