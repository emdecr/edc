<template>
  <main>
    <h1>Writing</h1>
    <comp-cards
      v-if="posts != null"
      class="writing-cards"
      :info="posts"
      path="writing"
      children="na"
    />
  </main>
</template>

<script>
import Cards from "~/components/card-list.vue";
export default {
  components: {
    "comp-cards": Cards
  },
  async fetch({ store }) {
    await store.dispatch("content/getPages");
    await store.dispatch("content/getPosts");
  },
  head() {
    return {
      title: "Emily Dela Cruz | Writing"
    };
  },
  methods: {
    image(i) {
      if (i.hasOwnProperty("_embedded")) {
        if (i._embedded.hasOwnProperty("wp:featuredmedia")) {
          if (
            i._embedded["wp:featuredmedia"][0]["media_details"][
              "sizes"
            ].hasOwnProperty("large")
          ) {
            return i._embedded["wp:featuredmedia"][0]["media_details"]["sizes"][
              "large"
            ]["source_url"];
          } else {
            return i._embedded["wp:featuredmedia"][0]["source_url"];
          }
        } else {
          return "";
        }
      } else {
        return "";
      }
    }
  },
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
  max-width: 650px;
  padding: 2rem 0;
}

.writing-cards {
  margin: 2rem 0;
}
</style>

