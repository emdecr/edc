<?php 
// Creates new endpoint for logged-in user to create a vote in wp_votes
class now_custom_route extends WP_REST_Controller {
	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = 'edc/v' . $version;
		$ep = 'now';
        register_rest_route( $namespace, '/' . $ep , array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_now' ),
				'permission_callback' => array( $this, 'get_now_permissions_check' )
			),
		) );
	}
    
    /**
	 * Sends email to MP
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	*/
	public function get_now( $request ) {
        // This is where the auth creds go
		// Included in the gitignore (must be created manually)
        include('endpoint_vars.php');
        
        $responseObj = new stdClass();

		// LastFM Req
		$musicUrl = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" . $LASTFM_USER . "&api_key=" . $LASTFM_KEY . "&format=json&limit=1";

		// Create args array
		$musicArgs = array(
			'method'  => 'GET'
		);
		
		// Make request to New/Mode API
		$musicRes = wp_remote_request( $musicUrl, $musicArgs );
		
		// Error Handle
		if ( !is_wp_error($musicRes) ) {
            $musicArray = json_decode( $musicRes['body'], true );
			$responseObj->music = $musicArray;
		} else {
			$responseObj->music = false;
        }

        // Github Req
		$gitUrl = "https://api.github.com/users/emdecr/events";

		// Create args array
		// Use vars in endpoint_vars.php for Basic Auth - $NM_USER, $NM_KEY
		$gitArgs = array(
			'method'  => 'GET'
		);
		
		// Make request to New/Mode API
		$gitRes = wp_remote_request( $gitUrl, $gitArgs );
		
		// Error Handle
		if ( !is_wp_error($gitRes) ) {
            $gitArray = json_decode( $gitRes['body'], true );
            $responseObj->github = $gitArray;
            
		} else {
			$responseObj->github = false;
        }
        
        // Get Shelf Item
        $shelfArgs = array(
            'posts_per_page' => 1,
			'post_type' => array( 'shelf-item' ),
            'post_status' => array( 'publish' )
		);
		
		$shelfQuery = new WP_Query( $shelfArgs );

        $shelfResults = $shelfQuery->posts;

        $postCount = count($shelfResults);

        if ($postCount > 0) {
            $newObj = new stdClass();
            $postData = $shelfResults[0];
            $newObj->ID = $postData->ID;
            $newObj->date = $postData->post_date;
            $newObj->title = $postData->post_title;
            $link = get_post_meta( $postData->ID, '_shelf_item_link', true);
            $newObj->link = $link;
            $shelf_thumbnail_url = get_the_post_thumbnail_url( $postData->ID, 'medium');
            $newObj->image_url = $shelf_thumbnail_url;

            $responseObj->shelf = $newObj;
        } else {
            $responseObj->shelf = false;
        }

        // Get Read
        $readArgs = array(
            'posts_per_page' => 1,
			'post_type' => array( 'read' ),
            'post_status' => array( 'publish' ),
            'tax_query' => array(
                array(
                    'taxonomy' => 'flag',
                    'terms'    => 24,
                ),
            ),
		);
		
		$readQuery = new WP_Query( $readArgs );

        $readResults = $readQuery->posts;

        $readCount = count($readResults);

        if ($readCount > 0) {
            $newObj = new stdClass();
            $postData = $readResults[0];
            $newObj->ID = $postData->ID;
            $newObj->date = $postData->post_date;
            $newObj->title = $postData->post_title;
            $read_thumbnail_url = get_the_post_thumbnail_url( $postData->ID, 'medium');
            $newObj->image_url = $read_thumbnail_url;
           
            $responseObj->read = $newObj;
        } else {
            $responseObj->read = false;
        }

        return new WP_REST_Response( 
            array(
                "code" => 200,
                "message" => "Success",
                "data" => $responseObj
            ) 
        );
	}

	/**
	 * Check if a given request has access to vote endpoints
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	*/
	public function get_now_permissions_check( $request ) {
		return true;
	}

}

/**
 * Function to register our new routes from the controller.
 */
function register_now_custom_route_controller() {
	$controller = new now_custom_route();
	$controller->register_routes();
}
add_action( 'rest_api_init', 'register_now_custom_route_controller' );
?>