<?php 
// Creates new endpoint for logged-in user to create a vote in wp_votes
class pinterest_custom_route extends WP_REST_Controller {
	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = 'edc/v' . $version;
		$pin = 'pins';
        register_rest_route( $namespace, '/' . $pin, array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_pinterest_items' ),
				'permission_callback' => array( $this, 'get_pinterest_items_permissions_check' ),
				'args' => array(
                    'id' => array(
                      'validate_callback' => function($param, $request, $key) {
                        return is_numeric( $param );
                      }
                    ),
                ),
			),
		) );
	}
    
    /**
	 * Sends email to MP
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	*/
	public function get_pinterest_items( $request ) {

		// Get the value of option fields 
		// Set an empty string if the field doesn't exist
		$settings = get_option( 'edc_ops' );
		$pin_date = 'pin_date_time';
		$pin_date_val = isset( $settings[$pin_date] ) ? $settings[$pin_date] : '';
		// $pin_data = 'pin_data';
		// $pin_data_val = isset( $settings[$pin_data] ) ? $settings[$pin_data] : '';

		if ($pin_data_val == "") {
			
			$date = date('Y/m/d h:i:s a');
			update_option( 'pin_date_time', $date, null );
			return new WP_REST_Response( $date, 200 );
		} else {
			return new WP_REST_Response( $pin_date_val, 200 );
		}

		// $now = date('Y/m/d h:i:s a');
		// $then = $pin_data_val; 

		// $diff = date_diff( $now, $then); 

		// This is where the auth creds go
		// Included in the gitignore (must be created manually)
		include('endpoint_vars.php');

		// Set var for POST request data body
		// $payload 	= $request->get_params();

        // Use vars in endpoint_vars.php for Basic Auth - $PIN_KEY, $PIN_USER
		$url = 'https://api.pinterest.com/v1/boards/'.$PIN_USER.'/'.$PIN_SHELF.'/pins/?access_token='.$PIN_KEY.'&fields=id,url,link,note,image,created_at,metadata';

		// Create args array
		$args = array(
			'method'  => 'GET',
		);
		
		// Make request to New/Mode API
		// $res = wp_remote_request( $url, $args );
		
		// Error Handle
		// if ( is_wp_error($res) ) {
		// 	return new WP_Error( 'pinterest_error', esc_html__( 'Pinterest API Error.', 'my-text-domain' ), array( 'status' => 401 ) );
		// } else {
		// 	return new WP_REST_Response( $res, 200 );
		// }

	}

	/**
	 * Check if a given request has access to vote endpoints
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	*/
	public function get_pinterest_items_permissions_check( $request ) {
		return true;
	}

}

/**
 * Function to register our new routes from the controller.
 */
function register_pinterest_custom_route_controller() {
	$controller = new pinterest_custom_route();
	$controller->register_routes();
}
add_action( 'rest_api_init', 'register_pinterest_custom_route_controller' );
?>