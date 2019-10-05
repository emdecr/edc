<?php
namespace MBSP;

class SettingsPage {
	private $args;
	private $page_hook;

	public function __construct( $args = array() ) {
		$this->args = $this->normalize( $args );

		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'rwmb_before', array( $this, 'show_meta_box_tab' ) );
		add_action( 'init', array( $this, 'trigger_init_hook' ), 20 );
	}

	/**
	 * Trigger an init hook for meta box to get page args.
	 */
	public function trigger_init_hook() {
		do_action( 'mb_settings_page_init', $this->args );
	}

	public function normalize( $args ) {
		$args = wp_parse_args( $args, array(
			'id'            => '', // Page ID. Required. Will be used as slug in URL and option name (if missed).
			'option_name'   => '', // Option name. Optional. Takes 'id' if missed.
			'menu_title'    => '', // Menu title. Optional. Takes 'page_title' if missed.
			'page_title'    => '', // Page title. Optional. Takes 'menu_title' if missed.
			'capability'    => 'edit_theme_options', // Required capability to visit.
			'icon_url'      => '', // Icon URL. @see add_menu_page().
			'position'      => null, // Menu position. @see add_menu_page().
			'parent'        => '', // ID of parent page. Optional.
			'submenu_title' => '', // Submenu title. Optional.
			'help_tabs'     => array(),
			'style'         => 'boxes',
			'columns'       => 2,
			'tabs'          => array(),
			'class'         => '',
			'submit_button' => __( 'Save Settings', 'mb-settings-page' ),
			'message'       => __( 'Settings saved.', 'mb-settings-page' ),
		) );

		// Setup optional parameters.
		if ( ! $args['option_name'] ) {
			$args['option_name'] = $args['id'];
		}
		if ( ! $args['menu_title'] ) {
			$args['menu_title'] = $args['page_title'];
		}
		if ( ! $args['page_title'] ) {
			$args['page_title'] = $args['menu_title'];
		}

		return $args;
	}

	public function admin_menu() {
		// Add top level menu.
		if ( ! $this->args['parent'] ) {
			$this->page_hook = add_menu_page(
				$this->args['page_title'],
				$this->args['menu_title'],
				$this->args['capability'],
				$this->args['id'],
				array( $this, 'show' ),
				$this->args['icon_url'],
				$this->args['position']
			);

			// If this menu has a default sub-menu.
			if ( $this->args['submenu_title'] ) {
				add_submenu_page(
					$this->args['id'],
					$this->args['page_title'],
					$this->args['submenu_title'],
					$this->args['capability'],
					$this->args['id'],
					array( $this, 'show' )
				);
			}
		} // Add sub-menu.
		else {
			$this->page_hook = add_submenu_page(
				$this->args['parent'],
				$this->args['page_title'],
				$this->args['menu_title'],
				$this->args['capability'],
				$this->args['id'],
				array( $this, 'show' )
			);
		}

		// Enqueue scripts and styles.
		add_action( "admin_print_styles-{$this->page_hook}", array( $this, 'enqueue' ) );

		// Load action.
		add_action( "load-{$this->page_hook}", array( $this, 'load' ) );
	}

	public function show() {
		$class      = trim( "wrap {$this->args['class']}" );
		$form_class = 'boxes' === $this->args['style'] ? '' : "rwmb-settings-{$this->args['style']}";
		?>
		<div class="<?php echo esc_attr( $class ) ?>">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>

			<?php if ( $this->args['tabs'] ) : ?>
				<h2 class="nav-tab-wrapper">
					<?php foreach ( $this->args['tabs'] as $id => $title ) : ?>
						<a href="#<?php echo 'tab-', esc_attr( $id ); ?>" class="nav-tab"><?php echo esc_html( $title ); ?></a>
					<?php endforeach; ?>
				</h2>
			<?php endif; ?>

			<form method="post" action="" enctype="multipart/form-data" id="post"<?php echo $form_class ? ' class="' . esc_html( $form_class ) . '"' : ''; ?>>
				<div id="poststuff">
					<?php
					// Nonce for saving meta boxes status (collapsed/expanded) and order.
					wp_nonce_field( 'closedpostboxes', 'closedpostboxesnonce', false );
					wp_nonce_field( 'meta-box-order', 'meta-box-order-nonce', false );
					?>
					<div id="post-body" class="metabox-holder columns-<?php echo intval( $this->args['columns'] ); ?>">
						<?php if ( $this->args['columns'] > 1 ) : ?>
							<div id="postbox-container-1" class="postbox-container">
								<?php do_meta_boxes( null, 'side', null ); ?>
							</div>
						<?php endif; ?>
						<div id="postbox-container-2" class="postbox-container">
							<?php do_meta_boxes( null, 'normal', null ); ?>
							<?php do_meta_boxes( null, 'advanced', null ); ?>
						</div>
					</div>
					<br class="clear">
					<p class="submit">
						<?php submit_button( esc_html( $this->args['submit_button'] ), 'primary', 'submit', false ); ?>
						<?php do_action( 'mb_settings_page_submit_buttons' ); ?>
					</p>
				</div>
			</form>
		</div>
		<?php
	}

	public function enqueue() {
		list( , $url ) = \RWMB_Loader::get_path( dirname( dirname( __FILE__ ) ) );
		wp_enqueue_style( 'mb-settings-page', $url . 'css/settings.css', '', '1.3' );

		// For meta boxes.
		wp_enqueue_script( 'common' );
		wp_enqueue_script( 'wp-lists' );
		wp_enqueue_script( 'postbox' );

		// Enqueue settings page script and style.
		wp_enqueue_script( 'mb-settings-page', $url . 'js/script.js', array( 'jquery' ), '1.1.2', true );
		wp_localize_script( 'mb-settings-page', 'MBSettingsPage', array(
			'pageHook' => $this->page_hook,
			'tabs'     => array_keys( $this->args['tabs'] ),
		) );
	}

	public function load() {
		/**
		 * Custom hook runs when current page loads. Use this to add meta boxes and filters.
		 *
		 * @param array $page_args The page arguments
		 */
		do_action( 'mb_settings_page_load', $this->args );

		// Show updated message.
		if ( ! $this->args['parent'] || 'options-general.php' !== $this->args['parent'] ) {
			add_action( 'admin_notices', array( $this, 'admin_notices' ) );
		}

		$this->add_help_tabs();
	}

	public function admin_notices() {
		settings_errors( $this->args['id'] );
	}

	private function add_help_tabs() {
		if ( ! $this->args['help_tabs'] || ! is_array( $this->args['help_tabs'] ) ) {
			return;
		}
		$screen = get_current_screen();
		foreach ( $this->args['help_tabs'] as $k => $help_tab ) {
			// Auto generate help tab ID if missed.
			if ( empty( $help_tab['id'] ) ) {
				$help_tab['id'] = "{$this->args['id']}-help-tab-$k";
			}
			$screen->add_help_tab( $help_tab );
		}
	}

	/**
	 * Show tab id of meta box.
	 *
	 * @param RW_Meta_Box $obj Meta Box instance.
	 */
	public function show_meta_box_tab( $obj ) {
		if ( ! empty( $obj->meta_box['tab'] ) ) {
			echo '<script type="text/html" class="rwmb-settings-tab" data-tab="', esc_attr( $obj->meta_box['tab'] ), '"></script>';
		}
	}
}
