<template>
  <main>
    <h1>Projects</h1>
    <nuxt-link :to="'/projects/'+item.slug" v-for="(item, i) in projects" :key="'item-'+i" class>
      <h2>{{item.title.rendered}}</h2>
    </nuxt-link>
  </main>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("content/getPages");
    await store.dispatch("content/getProjects");
  },
  methods: {},
  computed: {
    projects() {
      return this.$store.getters["content/getProjects"];
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
