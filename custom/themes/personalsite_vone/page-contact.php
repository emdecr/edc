<?php //Template Name: Contact Page ?>
<?php get_header(); ?>

<div class="main">
  <div class="container">

    <div class="wrapper">

				<section class="contactPg clearfix">
					<h2>Contact + Connect</h2>

					<div class="wrapper">
						<p class="panel-intro">I would love to meet up and chat about a project or idea that you want to bring to life.</p>
						
		        <p class="sendEmail">Send me an email at<span class="spreadtext"> <a href="mailto:hello@emilydelacruz.com">hello@emilydelacruz.com</a></span> or use the form below:</p>

		        <section class="contactForm">
	            <div class="content-wrapper">
                <form name="" action="#" method="post" class="contact-form">
                  <div class="top-row">
                    <div class="column">
                      <div class="column-inner">
                        <input type="text" name="yourname" class="required" placeholder="Your Name" id="fullname">
                      </div>
                    </div>
                      <div class="column">
                        <div class="column-inner">
                        <input type="email" name="youremail" class="required" placeholder="Your Email" id="email">
                        </div>
                      </div>
                  </div>
                  <div class="bottom-row">
                    <textarea name="message" class="required" id="formcontent" aria-invalid="false" placeholder="Your Message"></textarea>
                  </div>
                  <div class="modal">
                  	<div class="wrapperModal">
                  		<div class="success">
                  			<i class="fa fa-envelope-o"></i>
                  			<h2>Your email was sent! Thanks for reaching out!</h2>
                  		</div>
                  		<div class="error">
                  			<i class="fa fa-exclamation-triangle"></i>
                  			<h3>Your email was not sent! Please email me directly at hello@emaildelacruz.com. Sorry for the inconvenience.</h3>
                  		</div>
                  	</div>
                  </div>
                  <p class="sub-but">
                    <input type="submit" value="SEND MESSAGE" class="submit" />
                  </p>
                </form>
	            </div>
		        </section>
						
						<div class="socialPg">
							<a href="http://twitter.com/emdecr" title="Twitter" target="_blank"><i class="fa fa-twitter"></i></a>
							<a href="https://ca.linkedin.com/in/emilydelacruz" title="LinkedIn" target="_blank"><i class="fa fa-linkedin-square"></i></a>
							<a href="http://ampersandaway.com/" title="Tumblr" target="_blank"><i class="fa fa-tumblr-square"></i></a>
							<a href="https://medium.com/@emdecr" title="Medium Blog" target="_blank"><i class="fa fa-medium"></i></a>
							<a href="https://github.com/emdecr" title="Github" target="_blank"><i class="fa fa-code-fork"></i></a>
						</div>
					</div>
				</section>
    	
    		
    </div> <!--/.wrapper -->
  </div> <!-- /.container -->
</div> <!-- /.main -->

<?php get_footer(); ?>