<?php get_header(); ?>

<div class="main">
  <div class="container">
    <div class="wrapper">
      <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

        <section class="pro-container clearfix">
          <div class="full-details">
            <h2><?php the_title(); ?></h2>
            <h4>
              <?php the_field( 'project_name' ); ?>
            </h4>
            <p class="techUsed">
              <?php the_field( 'tech_used' ); ?>
            </p>
            <h3><strong>Client: </strong> <?php the_field('client_name'); ?></h3>
            <a href="<?php the_field( 'project_url' ); ?>" target="_blank">
              <div class="liveDemoBtn">
                <p>View Live</p>
              </div>
            </a>
            <p class="longDesc"><?php the_field('long_descrip'); ?></p>
          </div>
          <div class="image-container">
            <img src="<?php the_field('project_screenshot'); ?>">
            <img src="<?php the_field('mobile_mockup'); ?>">
          </div>
        </section>

		<?php the_content(); ?>

      <?php endwhile; // end of the loop. ?>

    </div> <!-- /.wrapper -->

  </div> <!-- /.container -->
</div> <!-- /.main -->

<?php get_footer(); ?>