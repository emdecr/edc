<template>
  <main>
    <h1>Projects</h1>
    <div class="content" v-html="page.content.rendered"></div>
    <comp-cards
      v-if="projects != null"
      class="project-cards"
      :info="projects"
      path="projects"
      children="yes"
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
    await store.dispatch("content/getProjects");
  },
  head() {
    return {
      title: "Emily Dela Cruz | Projects"
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
    page() {
      return this.$store.getters["content/getPages"]("projects");
    },
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
  max-width: 650px;
  padding: 2rem 0;
  font-size: smaller;
}
</style>
