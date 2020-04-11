<?php 
// Creates new endpoint to get records for Life Overview
class life_overview_custom_route extends WP_REST_Controller {
	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = 'edc/v' . $version;
		$weather = 'life';
        register_rest_route( $namespace, '/' . $weather, array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_life_records' ),
				'permission_callback' => array( $this, 'get_life_records_permissions_check' )
			),
		) );
	}
    
    /**
	 * Gets Pinterest Shelf Info
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	*/
	public function get_life_records( $request ) {

		// This is where the auth creds go
		// Included in the gitignore (must be created manually)
		include('endpoint_vars.php');

		// Set var for POST request data body
		// $payload 	= $request->get_params();

		$args = array(
			'post_type' => array( 'life-record' )
		);
		
		$the_query = new WP_Query( $args );
        
        $data = array();

		return new WP_REST_Response( 
            array(
                'status' => 200,
                'response' => "Success!",
                'body_response' => $the_query
            ) 
        );
	}

	/**
	 * Check if a given request has access to data
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	*/
	public function get_life_records_permissions_check( $request ) {
		return true;
	}

}

/**
 * Function to register our new routes from the controller.
 */
function register_life_records_custom_route_controller() {
	$controller = new life_overview_custom_route();
	$controller->register_routes();
}
add_action( 'rest_api_init', 'register_life_records_custom_route_controller' );
?>