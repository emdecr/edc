<template>
  <main>
    <h1>Writing</h1>
    <nuxt-link :to="'/writing/'+item.slug" v-for="(item, i) in posts" :key="'item-'+i" class>
      <h2 v-html="item.title.rendered"></h2>
    </nuxt-link>
  </main>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("content/getPages");
    await store.dispatch("content/getPosts");
  },
  methods: {},
  computed: {
    posts() {
      return this.$store.getters["content/getPosts"];
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  max-width: 1000px;
  margin: 0 auto;
}

.content {
  max-width: 800px;
  padding: 2rem 0;
}
</style>
