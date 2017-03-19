<?php //Template Name: About Page ?>
<?php get_header(); ?>

<div class="main">
  <div class="container">
    <div class="wrapper sectionAbout">
			<h2>A little more info about myself...</h2>

			<div class="aboutBio clearfix">
				 <img class="top" src="<?php the_field( 'main_portrait' ); ?>" alt="Me as an adult." />
				<?php if (have_posts()) : while (have_posts()) : the_post();?>
				<div class="myBiography clearfix">
					<p><?php the_content(); ?></p>
				</div>
				<?php endwhile; endif; ?>
			</div>

			<h3>On My 'Currently Enjoying' Shelf</h3>
			<div class="shelfOne clearfix">
				<?php 

				$images = get_field('shelf_one');

				if( $images ): ?>
	        <?php foreach( $images as $image ): ?>
            <div class="shelf-item">
            	<a href="<?php echo $image['description']; ?>" target="_blank">
            	     <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
            	</a>
            </div>
	        <?php endforeach; ?>
				<?php endif; ?>
			</div>
			<div class="shelfTwo clearfix">
				<?php 

				$images = get_field('shelf_two');

				if( $images ): ?>
	        <?php foreach( $images as $image ): ?>
            <div class="shelf-item">
            	<a href="<?php echo $image['description']; ?>" target="_blank">
            	     <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
            	</a>
            </div>
	        <?php endforeach; ?>
				<?php endif; ?>
			</div>
    	
    </div> <!--/.wrapper -->
  </div> <!-- /.container -->
</div> <!-- /.main -->

<?php get_footer(); ?>