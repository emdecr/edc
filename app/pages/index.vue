<template>
  <main class>
    <section class="intro">
      <span class="name">emily dela cruz</span>
      <span class="pronouns">she/her</span>
      <div class="content" v-html="page.content.rendered"></div>

      <h2>Projects</h2>
      <nuxt-link :to="'/projects/'+item.slug" v-for="(item, i) in projects" :key="'item-'+i" class>
        <h2>{{item.title.rendered}}</h2>
      </nuxt-link>
      <!-- <div class="btns">
        <nuxt-link class="btn" to="/about">My journey thus far...</nuxt-link>
        <nuxt-link class="btn" to="/projects">Opportunities and challenges</nuxt-link>
      </div>-->
    </section>
  </main>
</template>

<script>
export default {
  components: {},
  async fetch({ store }) {
    await store.dispatch("content/getGithub");
    await store.dispatch("content/getMusic");
    await store.dispatch("content/getPages");
    await store.dispatch("content/getProjects");
    await store.dispatch("content/getShelfItems");
  },
  computed: {
    page() {
      return this.$store.getters["content/getPages"]("home");
    },
    projects() {
      return this.$store.getters["content/getProjects"];
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;
}

span.name {
  //   font-family: ff-more-web-pro, serif;
  font-weight: 500;
  font-style: normal;
  font-size: 30px;
  color: rgb(37, 37, 37);
}

.pronouns {
  font-size: 0.8rem;
  margin-left: 0.5rem;
  display: inline-block;
  // font-style: italic;
}

@media (prefers-color-scheme: dark) {
  span.name {
    color: #d7d7d7;
  }
}

p {
  font-family: input-mono, monospace;
  font-weight: 300;
  font-style: normal;
}

.btns {
  margin-top: 1rem;
}
</style>
