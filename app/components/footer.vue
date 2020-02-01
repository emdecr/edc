<template>
  <footer id="contact">
    <div class="flex-all flex--jc-fe">
      <div>
        <p class="text-align--r">
          What's your story?
          <br>What do you need help with?
          <br>
          <strong>Let's chat.</strong>
        </p>
        <ul class="lst--none text-align--r">
          <li>
            <a href="mailto:hello@emilydelacruz.com">hello@emilydelacruz.com</a>
          </li>
          <li>
            <a href="https://twitter.com/emdecr" target="_blank">twitter</a> |
            <a href="https://github.com/emdecr" target="_blank">github</a> |
            <a href="https://www.linkedin.com/in/emilydelacruz/" target="_blank">linkedin</a>
          </li>
        </ul>
        <p class="made mono">
          This site is built with
          <a href="https://nuxtjs.org/" target="_blank">NuxtJS</a>, using a
          <a
            href="https://en-ca.wordpress.org/"
            target="_blank"
          >WordPress-powered headless CMS</a>, and is hosted on
          <a href="https://www.linode.com/" target="_blank">Linode</a>.
          <a href="https://github.com/emdecr/edc" target="_blank">Github</a> hosts the source code.
        </p>
        <p class="made mono">&copy; 2015–2020 Copyright Emily Dela Cruz. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
footer {
  padding: 4rem 0;
}

@media only screen and (max-width: 500px) {
  footer {
    padding: 4rem 2rem 200px;
  }
}

footer > div {
  max-width: 1000px;
  margin: 0 auto;
}

ul {
  margin: 0;
  padding: 0;
  margin-top: 0.5rem;
  li:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}

.made {
  max-width: 550px;
  text-align: right;
  margin-top: 2rem;
  opacity: 0.5;
  font-size: 0.7rem;
}
</style>
