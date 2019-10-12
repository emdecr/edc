<?php 
// Creates new endpoint to get Pinterest shelf items
class weather_custom_route extends WP_REST_Controller {
	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = 'edc/v' . $version;
		$weather = 'weather';
        register_rest_route( $namespace, '/' . $weather, array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_weather' ),
				'permission_callback' => array( $this, 'get_weather_permissions_check' )
			),
		) );
	}
    
    /**
	 * Gets Pinterest Shelf Info
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	*/
	public function get_weather( $request ) {

		// This is where the auth creds go
		// Included in the gitignore (must be created manually)
		include('endpoint_vars.php');

		// Set var for POST request data body
		// $payload 	= $request->get_params();

		// Use vars in endpoint_vars.php - $WEATHER_CITY, $WEATHER_KEY
		$url = 'http://api.openweathermap.org/data/2.5/weather?id='.$WEATHER_CITY.'&appid='.$WEATHER_KEY;

		// Create args array
		$args = array(
			'method'  => 'GET',
		);

		// Get the value of option fields 
		// Set an empty string if the field doesn't exist
		$settings = get_option( 'edc_ops' );
		$weather_date = 'weather_date_time';
		$weather_date_val = isset( $settings[$weather_date] ) ? $settings[$weather_date] : '';
		$weather_data = 'weather_data';
		$weather_data_val = isset( $settings[$weather_data] ) ? $settings[$weather_data] : '';

		if ($weather_date_val == "") {
			//Alter the options array appropriately
			$date = date('Y/m/d h:i:sa');
			$settings[$weather_date] = $date;

			update_option('edc_ops', $settings);

			// Make request to Pinterest API
			$res = wp_remote_request( $url, $args );

			$data = $res['body']['data'];

			$settings[$weather_data] = $data;

			//Update entire array
			update_option('edc_ops', $settings);

			// Make request to Pinterest API
			$res = wp_remote_request( $url, $args );

			// Error Handle
			if ( is_wp_error($res) ) {
				return new WP_Error( 'pinterest_error', esc_html__( 'Pinterest API Error.', 'my-text-domain' ), array( 'status' => 401 ) );
			} else {
				$data = $res['body'];

				$settings[$weather_data] = $data;

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
			$then = new DateTime($weather_date_val);
			
			$diff = date_diff( $now, $then );

			if ( $diff->h > 5 ) {
				$date = date('Y/m/d h:i:sa');
				$settings[$weather_date] = $date;

				update_option('edc_ops', $settings);

				// Make request to Pinterest API
				$res = wp_remote_request( $url, $args );

				// Error Handle
				if ( is_wp_error($res) ) {
					return new WP_Error( 'pinterest_error', esc_html__( 'Pinterest API Error.', 'my-text-domain' ), array( 'status' => 401 ) );
				} else {
					$data = $res['body'];

					$settings[$weather_data] = $data;

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
						'hours' => $diff->h,
						'mins' => $diff->i,
						'response' => "Success!",
						'body_response' => $weather_data_val
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
	public function get_weather_check( $request ) {
		return true;
	}

}

/**
 * Function to register our new routes from the controller.
 */
function register_weather_custom_route_controller() {
	$controller = new weather_custom_route();
	$controller->register_routes();
}
add_action( 'rest_api_init', 'register_weather_custom_route_controller' );
?>