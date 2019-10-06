<?php 
// Creates new endpoint to get Pinterest shelf items
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
	 * Gets Pinterest Shelf Info
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	*/
	public function get_pinterest_items( $request ) {

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

		// Get the value of option fields 
		// Set an empty string if the field doesn't exist
		$settings = get_option( 'edc_ops' );
		$pin_date = 'pin_date_time';
		$pin_date_val = isset( $settings[$pin_date] ) ? $settings[$pin_date] : '';
		$pin_data = 'pin_data';
		$pin_data_val = isset( $settings[$pin_data] ) ? $settings[$pin_data] : '';

		if ($pin_date_val == "") {
			//Alter the options array appropriately
			$date = date('Y/m/d h:i:sa');
			$settings[$pin_date] = $date;

			update_option('edc_ops', $settings);

			// Make request to Pinterest API
			$res = wp_remote_request( $url, $args );

			$data = $res['body']['data'];

			$settings[$pin_data] = $data;

			//Update entire array
			update_option('edc_ops', $settings);

			// Make request to Pinterest API
			$res = wp_remote_request( $url, $args );

			// Error Handle
			if ( is_wp_error($res) ) {
				return new WP_Error( 'pinterest_error', esc_html__( 'Pinterest API Error.', 'my-text-domain' ), array( 'status' => 401 ) );
			} else {
				$data = $res['body'];

				$settings[$pin_data] = $data;

				//Update entire array
				update_option('edc_ops', $settings);

				return new WP_REST_Response( 
					array(
						'status' => 200,
						'response' => "Success!",
						'body_response' => $data
					) 
				);
			}
		} else {
			$now = new DateTime();
			$then = new DateTime($pin_date_val);
			
			$diff = date_diff( $now, $then );

			if ( $diff->h > 5 ) {
				$date = date('Y/m/d h:i:sa');
				$settings[$pin_date] = $date;

				update_option('edc_ops', $settings);

				// Make request to Pinterest API
				$res = wp_remote_request( $url, $args );

				// Error Handle
				if ( is_wp_error($res) ) {
					return new WP_Error( 'pinterest_error', esc_html__( 'Pinterest API Error.', 'my-text-domain' ), array( 'status' => 401 ) );
				} else {
					$data = $res['body'];

					$settings[$pin_data] = $data;

					//Update entire array
					update_option('edc_ops', $settings);

					return new WP_REST_Response( 
						array(
							'status' => 200,
							'response' => "Success!",
							'body_response' => $data
						) 
					);
				}
			} else {
				return new WP_REST_Response( 
					array(
						'status' => 200,
						'response' => "Success!",
						'body_response' => $pin_data_val
				  	) 
				);
			}
		}
	}

	/**
	 * Check if a given request has access to data
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