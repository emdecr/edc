<?php
/**
 * Plugin Name: MB Blocks
 * Plugin URI:  https://metabox.io/plugins/mb-blocks/
 * Description: Create custom Gutenberg blocks.
 * Version:     1.2.3
 * Author:      MetaBox.io
 * Author URI:  https://metabox.io
 * License:     GPL2+
 * Text Domain: mb-blocks
 * Domain Path: /languages/
 *
 * @package    Meta Box
 * @subpackage MB Blocks
 */

// Prevent loading this file directly.
defined( 'ABSPATH' ) || die;

if ( ! function_exists( 'mb_blocks_load' ) ) {

	if ( file_exists( __DIR__ . '/vendor' ) ) {
		require __DIR__ . '/vendor/autoload.php';
	}

	add_action( 'init', 'mb_blocks_load', 5 );

	function mb_blocks_load() {
		if ( ! defined( 'RWMB_VER' ) || version_compare( get_bloginfo( 'version' ), '5.0', '<' ) ) {
			return;
		}

		list( , $url ) = RWMB_Loader::get_path( __DIR__ );
		define( 'MB_BLOCKS_URL', $url );
		define( 'MB_BLOCKS_VER', '1.2.3' );

		new MBBlocks\Loader;

		load_plugin_textdomain( 'mb-blocks', false, plugin_basename( __DIR__ ) . '/languages/' );
	}
}
