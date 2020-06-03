<?php // Add the custom columns to the book post type:
add_filter( 'manage_shelf-item_posts_columns', 'set_custom_edit_shelf_columns' );
function set_custom_edit_shelf_columns($columns) {
    $columns = array(
        'cb' => $columns['cb'],
        'title' => __( 'Title' ),
        'format' => __( 'Format(s)', 'edc' ),
        'date' => __( 'Date' )
      );

    return $columns;
}

// Add the data to the custom columns for the book post type:
add_action( 'manage_shelf-item_posts_custom_column' , 'custom_shelf_column', 10, 2 );
function custom_shelf_column( $column, $post_id ) {
    switch ( $column ) {

        case 'format' :

        /* Get the genres for the post. */
        $terms = get_the_terms( $post_id, 'format' );

        /* If terms were found. */
        if ( !empty( $terms ) ) {

            $out = array();

            /* Loop through each term, linking to the 'edit posts' page for the specific term. */
            foreach ( $terms as $term ) {
                $out[] = sprintf( '<a href="%s">%s</a>',
                    esc_url( add_query_arg( array( 'post_type' => $post->post_type, 'format' => $term->slug ), 'edit.php' ) ),
                    esc_html( sanitize_term_field( 'name', $term->name, $term->term_id, 'format', 'display' ) )
                );
            }

            /* Join the terms, separating them with a comma. */
            echo join( ', ', $out );
        }

        /* If no terms were found, output a default message. */
        else {
            _e( '' );
        }

        break;

    /* Just break out of the switch statement for everything else. */
    default :
        break;
    }
}
?>