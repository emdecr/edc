<template>
  <footer id="contact">
    <div class="flex-all flex--jc-fe">
      <div>
        <p class="text-align--r">
          What's your story?
          <br>What do you need a hand with?
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
</style>
