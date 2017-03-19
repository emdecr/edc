<?php 
/*
Template Name: Front-Page
*/
?>

<?php get_header('homepg'); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="emilyBio clearfix">
				<!-- Might just replace with the nice to meet you script? ala Twitter header -->
				<div class="wrapper clearfix">
					<h2>It's nice to meet you!</h2>
					<div class="homeBio">
						<div class="homePic">
							<img class="top" src="<?php the_field( 'home_portrait' ); ?>">
						</div>
						<?php if (have_posts()) : while (have_posts()) : the_post();?>
						<div class="homeBioText clearfix">
							<div><?php the_content(); ?></div>
						</div>
						<?php endwhile; endif; ?>
					</div>
					<div class="btnRow">
						<a href="/about">
							<div class="moreAbout">
								<p>About Page</p>
							</div>
						</a>
						<a href="https://ca.linkedin.com/in/emilydelacruz" target="_blank">
							<div class="resumeBtn">
								<p>LinkedIn</p>
							</div>
						</a>
					</div>
				</div>
			</section>

			<section class="featProjects clearfix">
				<h2>Featured Projects</h2>
					<div class="wrapper">
						<div class="project-container">
							<?php 
								$portfolioArgs = array('post_type' => 'projects', 'tag' => 'featured', 'order' => 'ASC'  ); //projects = slug --> key value pair
								$portfolioQuery = new WP_Query($portfolioArgs); //usually accepts an array of arguments
						
								if($portfolioQuery->have_posts()) {
									while($portfolioQuery->have_posts()) {
										$portfolioQuery->the_post();
										?>

									<div class="feat-item fadeInItem wow fadeIn">
										<div class="feat-image">
											<img src="<?php the_field( 'project_mockup' ); ?>" alt="A mockup picture of the project.">
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
					<!-- 	<a href="/projects">
							<div class="moreBtn">
								<p>More Projects</p>
							</div>
						</a> -->
					</div>
			</section>

			<section class="homeContact clearfix">
				<h2>Contact + Connect</h2>

				<div class="wrapper">
					<p class="panel-intro">I would love to meet up and chat about a project or idea that you want to bring to life.</p>
					
	        <p><strong>mailto</strong>:<span class="spreadtext"> <a href="mailto:hello@emilydelacruz.com">hello@emilydelacruz.com</a></span></p>
					
					<div class="social">
						<a href="http://twitter.com/emdecr" title="Twitter" target="_blank"><i class="fa fa-twitter"></i></a>
						<a href="https://ca.linkedin.com/in/emilydelacruz" title="LinkedIn" target="_blank"><i class="fa fa-linkedin-square"></i></a>
						<a href="http://ampersandaway.com/" title="Tumblr" target="_blank"><i class="fa fa-tumblr-square"></i></a>
						<a href="https://medium.com/@emdecr" title="Medium Blog" target="_blank"><i class="fa fa-medium"></i></a>
						<a href="https://github.com/emdecr" title="Github" target="_blank"><i class="fa fa-code-fork"></i></a>
					</div>
				</div>
			</section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
