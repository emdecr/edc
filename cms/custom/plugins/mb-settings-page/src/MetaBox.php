<?php
namespace MBSP;

class MetaBox extends \RW_Meta_Box {
	protected $object_type = 'setting';
	private $page_args;
	private $storage;

	public function __construct( $meta_box ) {
		parent::__construct( $meta_box );
		$this->meta_box['settings_pages'] = (array) $this->meta_box['settings_pages'];
	}

	protected function object_hooks() {
		add_action( 'mb_settings_page_init', array( $this, 'set_page_args' ) );
		add_action( 'mb_settings_page_load', array( $this, 'load' ) );

		// Register fields must run after init page args.
		add_action( 'init', array( $this, 'register_fields' ), 30 );
	}

	public function set_page_args( $page_args ) {
		if ( in_array( $page_args['id'], $this->settings_pages, true ) ) {
			$this->page_args = $page_args;
		}
	}

	public function load( $page_args ) {
		static $message_shown = false;

		if ( ! in_array( $page_args['id'], $this->meta_box['settings_pages'] ) ) {
			return;
		}

		// Reset page args and object ID for the current settings page.
		$this->page_args = $page_args;
		$this->set_object_id( $page_args['option_name'] );

		// Add meta boxes.
		add_meta_box(
			$this->id,
			$this->title,
			array( $this, 'show' ),
			null, // Current page.
			$this->context,
			$this->priority
		);

		// Save options.
		if ( empty( $_POST['submit'] ) ) {
			return;
		}

		$this->save_post( $page_args['option_name'] );

		// Compatible with old hook.
		$data = get_option( $page_args['option_name'], array() );
		$data = apply_filters( 'mb_settings_pages_data', $data, $page_args['option_name'] );
		update_option( $page_args['option_name'], $data );

		// Prevent duplicate messages.
		if ( ! $message_shown ) {
			add_settings_error( $page_args['id'], 'saved', $page_args['message'], 'updated' );
			$message_shown = true;
		}
	}

	public function get_storage() {
		if ( null === $this->storage ) {
			$this->storage = new Storage;
		}
		return $this->storage;
	}

	public function is_edit_screen( $screen = null ) {
		return in_array( $this->page_args['id'], $this->settings_pages, true );
	}

	protected function get_current_object_id() {
		return $this->page_args['option_name'];
	}

	public function register_fields() {
		if ( ! $this->page_args ) {
			return;
		}

		$field_registry = rwmb_get_registry( 'field' );

		foreach ( $this->fields as $field ) {
			$field_registry->add( $field, $this->page_args['option_name'], 'setting' );
		}
	}
}
