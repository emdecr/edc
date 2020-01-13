<template>
  <main>
    <h1 v-html="single.title.rendered"></h1>
    <div class="content" v-html="single.content.rendered"></div>
  </main>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("content/getProjects");
  },
  methods: {},
  computed: {
    projects() {
      return this.$store.getters["content/getProjects"];
    },
    single() {
      return this.$store.getters["content/getProjects"].filter(
        p => p.slug == this.$route.params.slug
      )[0];
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  max-width: 650px;
  margin: 0 auto;
}

.content {
  max-width: 650px;
  padding: 2rem 0;
  margin: 0 auto;
}
</style>
