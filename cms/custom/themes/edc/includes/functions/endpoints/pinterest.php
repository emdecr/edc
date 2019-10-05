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
				'methods'         => WP_REST_Server::CREATABLE,
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
		$res = wp_remote_request( $url, $args );
		
		// Error Handle
		if ( is_wp_error($res) ) {
			return new WP_Error( 'pinterest_error', esc_html__( 'Pinterest API Error.', 'my-text-domain' ), array( 'status' => 401 ) );
		} else {
			return new WP_REST_Response( $res, 200 );
		}

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