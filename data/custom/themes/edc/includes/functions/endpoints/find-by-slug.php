<?php 
// Creates new endpoint to get records for Life Overview
class find_by_slug_custom_route extends WP_REST_Controller {
	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = 'edc/v' . $version;
		$slug = 'slug';
        register_rest_route( $namespace, '/' . $slug . '/(?P<slug>[a-zA-Z0-9-]+)', array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_by_slug' ),
				'permission_callback' => array( $this, 'get_by_slug_permissions_check' )
			),
		) );
	}
    
    /**
	 * Gets a post by slug
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	*/
	public function get_by_slug( $request ) {

		$args = array(
            'posts_per_page' => -1,
			'post_type' => array( 'post', 'read', 'project' ),
            'post_status' => array( 'publish' ),
            'name' => $request['slug']
		);
		
		$the_query = new WP_Query( $args );

        $results = $the_query->posts;

        $postCount = count($results);

        if ($postCount > 0) {
            $newObj = new stdClass();
            $postData = $results[0];
            $newObj->ID = $postData->ID;
            $newObj->date = $postData->post_date;
            $newObj->type = $postData->post_type;
            $newObj->title = $postData->post_title;
            $newObj->content = $postData->post_content;
            $post_thumbnail_url = get_the_post_thumbnail_url( $postData->ID, 'medium');
            $newObj->image_url = $post_thumbnail_url;
            if ($postData->post_type == "read") {
                if( has_term( 24, 'flag', $postData->ID ) ) {
                    $newObj->currrently_reading = true;
                } else {
                    $newObj->currrently_reading = false;
                }
                $title = get_post_meta( $postData->ID, '_read_title', true);
                $newObj->read_title = $title;
                $subtitle = get_post_meta( $postData->ID, '_read_subtitle', true);
                $newObj->read_subtitle = $subtitle;
                $searchTitle = get_post_meta( $postData->ID, '_read_title_search', true);
                $newObj->search_title = $searchTitle;
                $isbn = get_post_meta( $postData->ID, '_read_isbn', true);
                $newObj->isbn = $isbn;
                $rating = get_post_meta( $postData->ID, '_read_rating', true);
                $newObj->rating = $rating;
                $authors = get_post_meta( $postData->ID, '_read_authors', true);
                $newObj->authors = $authors;
                $editors = get_post_meta( $postData->ID, '_read_editors', true);
                $newObj->editors = $editors;
                $publisher = get_post_meta( $postData->ID, '_read_publisher', true);
                $newObj->publisher = $publisher;
                $pubDate = get_post_meta( $postData->ID, '_read_date', true);
                $newObj->published_date = $pubDate;
                $pubYear = get_post_meta( $postData->ID, '_read_year', true);
                $newObj->published_year = $pubYear;
                $highlights = get_post_meta( $postData->ID, '_read_highlights', true);
                $newObj->highlights = $highlights;
            }
            
            return new WP_REST_Response( 
                array(
                    "code" => 200,
                    "message" => "Success",
                    "data" => $newObj
                ) 
            );
        } else {
            return new WP_Error( 401, esc_html__( 'No post found', 'my-text-domain' ), null );
        }
	}

	/**
	 * Check if a given request has access to data
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	*/
	public function get_by_slug_permissions_check( $request ) {
		// If they do match, return true and continue on to the callback function
		return true;
	}

}

/**
 * Function to register our new routes from the controller.
 */
function register_find_by_slug_custom_route_controller() {
	$controller = new find_by_slug_custom_route();
	$controller->register_routes();
}
add_action( 'rest_api_init', 'register_find_by_slug_custom_route_controller' );
?>