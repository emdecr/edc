<?php
namespace MBSP;

class Loader {
	public function init() {
		$this->register_settings_pages();

		add_filter( 'rwmb_meta_box_class_name', array( $this, 'meta_box_class_name' ), 10, 2 );

		add_filter( 'rwmb_meta_type', array( $this, 'filter_meta_type' ), 10, 3 );
	}

	public function register_settings_pages() {
		$settings_pages = apply_filters( 'mb_settings_pages', array() );

		if ( empty( $settings_pages ) || ! is_array( $settings_pages ) ) {
			return;
		}

		foreach ( $settings_pages as $settings_page ) {
			new SettingsPage( $settings_page );
		}
	}

	/**
	 * Filter meta box class name.
	 *
	 * @param  string $class_name Meta box class name.
	 * @param  array  $meta_box   Meta box data.
	 * @return string
	 */
	public function meta_box_class_name( $class_name, $meta_box ) {
		return isset( $meta_box['settings_pages'] ) ? __NAMESPACE__ . '\MetaBox' : $class_name;
	}

	/**
	 * Filter meta type from object type and object id.
	 *
	 * @param string     $type        Meta type get from object type and object id.
	 *                                Assert 'setting' if object id is a string.
	 * @param string     $object_type Object type.
	 * @param string|int $object_id   Object id. Should be the option name.
	 *
	 * @return string
	 */
	public function filter_meta_type( $type, $object_type, $object_id ) {
		return 'setting' === $object_type ? $object_id : $type;
	}
}
