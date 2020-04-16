<?php
//Load custom functions
require_once('includes/functions/enqueue-style.php');
require_once('includes/functions/enqueue-script.php');

// Load metabox customization
require_once('includes/functions/metabox/cpt-posts.php');
require_once('includes/functions/metabox/cpt-pages.php');
require_once('includes/functions/metabox/cpt-shelf-item.php');
require_once('includes/functions/metabox/cpt-project.php');
require_once('includes/functions/metabox/cpt-read.php');
require_once('includes/functions/metabox/cpt-life.php');
require_once('includes/functions/metabox/mb-settings.php');

// Load metabox custom blocks
require_once('includes/functions/metabox/blocks/annotation.php');

// Load custom endpoints
require_once('includes/functions/endpoints/life-overview.php');
require_once('includes/functions/endpoints/life-overview-all.php');
require_once('includes/functions/endpoints/pinterest.php');

// Enable Thumbnails
add_theme_support('post-thumbnails'); 
?>