<?php 
// Creates new endpoint to get records for Life Overview
class writing_custom_route extends WP_REST_Controller {
	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = 'edc/v' . $version;
		$slug = 'writing';
        register_rest_route( $namespace, '/' . $slug, array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_writing' ),
				'permission_callback' => array( $this, 'writing_permissions_check' )
			),
		) );
	}
    
    /**
	 * Gets a post by slug
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	*/
	public function get_writing( $request ) {

		$args = array(
            'posts_per_page' => 10,
			'post_type' => array( 'post', 'note' ),
            'post_status' => array( 'publish' )
		);
		
		$the_query = new WP_Query( $args );

        $results = $the_query->posts;

        $postCount = count($results);

        $finalArr = array();

        if ($postCount > 0) {
            foreach ($results as $r) {
                $newObj = new stdClass();
                $newObj->ID = $r->ID;
                $newObj->date = $r->post_date;
                $newObj->type = $r->post_type;
                $newObj->title = $r->post_title;
                $newObj->slug = $r->post_name;
                array_push($finalArr, $newObj);
            }
            return new WP_REST_Response( 
                array(
                    "code" => 200,
                    "message" => "Success",
                    "data" => $finalArr
                ) 
            );
        } else {
            return new WP_Error( 401, esc_html__( 'No posts found', 'my-text-domain' ), null );
        }
	}

	/**
	 * Check if a given request has access to data
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	*/
	public function writing_permissions_check( $request ) {
		// If they do match, return true and continue on to the callback function
		return true;
	}

}

/**
 * Function to register our new routes from the controller.
 */
function register_writing_custom_route_controller() {
	$controller = new writing_custom_route();
	$controller->register_routes();
}
add_action( 'rest_api_init', 'register_writing_custom_route_controller' );
?>