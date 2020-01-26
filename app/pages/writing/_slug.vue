<template>
  <main>
    <nuxt-link to="/writing" class="back">
      <span>
        <i class="material-icons">trending_flat</i>Back to Writing Index
      </span>
    </nuxt-link>
    <div class="container">
      <h1 v-html="single.title.rendered"></h1>
      <p class="subtitle mono" v-if="meta._post_subtitle != ''" v-html="meta._post_subtitle"></p>
    </div>
    <div class="content" v-html="single.content.rendered"></div>
    <nuxt-link to="/writing" class="back">
      <span>
        <i class="material-icons">trending_flat</i>Back to Writing Index
      </span>
    </nuxt-link>
  </main>
</template>

<script>
import { helper } from "~/plugins/helper.js";
export default {
  async fetch({ store }) {
    await store.dispatch("content/getPosts");
  },
  head() {
    return {
      title:
        "Emily Dela Cruz | Writing | " +
        helper.removeTags(this.single.title.rendered)
    };
  },
  computed: {
    projects() {
      return this.$store.getters["content/getPosts"];
    },
    single() {
      return this.$store.getters["content/getPosts"].filter(
        p => p.slug == this.$route.params.slug
      )[0];
    },
    meta() {
      return this.single.meta_box;
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  max-width: 1000px;
  margin: 0 auto;
}

.back {
  display: inline-block;
  margin-bottom: 4rem;
}

.back span {
  display: flex;
  align-items: center;
}

i {
  transform: rotate(180deg);
  margin-right: 0.5rem;
}

.container {
  max-width: 650px;
  margin: 0 auto;
}

.subtitle {
  margin: 1rem 0;
}

.content {
  max-width: 650px;
  padding: 2rem 0;
  margin: 0 auto;
}
</style>
