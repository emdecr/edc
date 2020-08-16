<?php
namespace MBB;

if ( file_exists( __DIR__ . '/vendor' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}

define( 'MBB_VER', '3.3.6' );
define( 'MBB_DIR', trailingslashit( __DIR__ ) );

list( , $url ) = \RWMB_Loader::get_path( MBB_DIR );
define( 'MBB_URL', $url );

// Show Meta Box admin menu.
add_filter( 'rwmb_admin_menu', '__return_true' );
load_plugin_textdomain( 'meta-box-builder', false, plugin_basename( MBB_DIR ) . '/languages/' );

Attribute::set_labels();
new PostType;
new Upgrade\Manager;
new Register;
new RestApi;

if ( is_admin() ) {
	new Import;
	new Edit;
	new AdminColumns;
}