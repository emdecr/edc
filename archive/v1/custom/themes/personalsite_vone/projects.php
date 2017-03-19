<?php //Template Name: Projects Page ?>
<?php get_header(); ?>

<div class="main">
  <div class="container">
    <section class="wrapper sectionProjects">

    	<?php 
    		if(have_posts()) {
    			while(have_posts()) {
    				the_post();
    				?>

    				<h2><?php the_title(); ?></h2>
    				<p><?php the_content(); ?></p>

						<div class="projectsCont">
							<?php 
								$portfolioArgs = array('post_type' => 'projects'); //projects = slug --> key value pair
								$portfolioQuery = new WP_Query($portfolioArgs); //usually accepts an array of arguments

								if($portfolioQuery->have_posts()) {
									while($portfolioQuery->have_posts()) {
										$portfolioQuery->the_post();
										?>
											<div class="feat-item-projects-page">
												<div class="feat-image">
													<img src="<?php the_field( 'project_screenshot' ); ?>" alt="A mockup picture of the project.">
												</div>
												<div class="feat-details">
													<a href="<?php the_permalink(); ?> ">
														<h3 id="unhide">&#10141; <?php the_title(); ?></h3>
													</a>
													<h4>
														<?php the_field( 'project_name' ); ?>
													</h4>
														<p class="techUsed">
															<?php the_field( 'tech_used' ); ?>
														</p>
														<p class="shrtDesc">
															<?php the_field( 'short_descrip' ); ?>
														</p>
														<div class="btnBox">
															<a href="<?php the_permalink(); ?> ">
																<div class="moreInfoBtn">
																	<p>More Info</p>
																</div>
															</a>
															<a href="<?php the_field( 'project_url' ); ?>" target="_blank">
																<div class="liveDemoBtn">
																	<p>View Live</p>
																</div>
															</a>
														</div>
												</div>
											</div>
										<?php
									}
									//end of while loop
									wp_reset_postdata();
								} //end of custom query
							?>
						</div>

						<?php
    			}
    		}
    	 ?>
    		
    </section> <!--/.wrapper -->
  </div> <!-- /.container -->
</div> <!-- /.main -->

<?php get_footer(); ?>