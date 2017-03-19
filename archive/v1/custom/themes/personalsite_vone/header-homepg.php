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

<!-- GA Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-56305018-1', 'auto');
  ga('send', 'pageview');

</script>

<!-- FONTS -->
<link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans:100,200,300,400,700|Karla:400,400italic,700,700italic|Montserrat:400,700|Oswald:300,400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

<!-- CSS -->
<!-- <link rel="stylesheet" href="style.css"> -->

<!-- JS -->
<!-- <script src="js/modernizr.custom.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/flickity/1.0.0/flickity.pkgd.js"></script> -->

<!-- FAVICON -->
<link rel="icon" type="image" href="images/favicon.ico">
<?php wp_head(); ?>
</head>

<body>
<div id="pageHome" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'personalsite_vone' ); ?></a>

	<header id="fadePanel" class="homeHeaderMain clearfix" role="banner">
		<div class="wrapper">
			<div class="site-branding">
				<h1 class="site-title-home"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<!-- <h2 class="site-description"><?php bloginfo( 'description' ); ?></h2> -->
			</div><!-- .site-branding -->
			
			<nav id="site-navigation-home" class="main-navigation" role="navigation">
				<!-- <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'personalsite_vone' ); ?></button> -->
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
			</nav><!-- #site-navigation -->
			
			<div id="textFade" class="hero-image-text animated fadeInLeft">
				<h5><?php the_field( 'home_opener' ); ?></h5>
				<h2><span class="homeHighlight"><?php the_field( 'home_tagline' ); ?></span></h2>
			</div>
		</div>

	</header><!-- #masthead -->

	<div id="content" class="site-content">
