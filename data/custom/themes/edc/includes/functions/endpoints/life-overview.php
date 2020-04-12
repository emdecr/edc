<?php 
// Creates new endpoint to get records for Life Overview
class life_overview_custom_route extends WP_REST_Controller {
	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = 'edc/v' . $version;
		$life = 'life';
        register_rest_route( $namespace, '/' . $life, array(
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
			'post_type' => array( 'life-record' ),
			'post_status' => array( 'publish' ),
			'posts_per_page' => -1,
		);
		
		$the_query = new WP_Query( $args );

		$results = $the_query->posts;

		function getWeek($dateString) {
			$weekNum = (strtotime( $dateString ) - strtotime( '1991-08-24 00:00:00' )) / 604800;
			// $startDate = new DateTime("1991-08-24");
			// $endDate = new DateTime($dateString);
			// $interval = $startDate->diff($endDate);
			// $weekNum =  (int)(($interval->days) / 7);
			return $weekNum;
		}

		$finalArr = array();

		foreach ($results as $r) {
			$newObj = new stdClass();
			// Work with the date
			$date = $r->post_date;
			$dateObj = new DateTime($r->post_date); 
			$formattedDate = date_format($dateObj, 'F j, Y');
			$week = getWeek($date);
			// Why is this off by ~5 weeks?
			$roundedWeek = round($week, 0) - 5;
			// Heading Check
			$altHeading = get_post_meta($r->ID, '_life_record_heading', true);
			$heading = $altHeading != '' ? $altHeading : $r->post_title;
			// Add key/value pairs to object
			$newObj->week = $roundedWeek;
			$newObj->date = $formattedDate;
			$newObj->title = $heading;
			$newObj->content = $r->post_content;
			// Push the object into the final response array
			array_push($finalArr, $newObj);
		}
		
		return new WP_REST_Response( 
            array(
                'status' => 200,
                'response' => "Success!",
                'body_response' => $finalArr
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