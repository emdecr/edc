<?php
//Load custom functions
require_once('includes/functions/enqueue-style.php');
require_once('includes/functions/enqueue-script.php');

// Add metabox
require_once('includes/functions/metabox/cpt-posts.php');
require_once('includes/functions/metabox/cpt-shelf-item.php');
require_once('includes/functions/metabox/mb-settings.php');

// Add custom endpoints
require_once('includes/functions/endpoints/pinterest.php');

// Enable Thumbnails
add_theme_support('post-thumbnails'); 
?>