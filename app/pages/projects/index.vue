<template>
  <main>
    <h1>Projects</h1>
    <div class="content">
      <small>
        <sup class="mono">*</sup> via
        <a href="https://hypenotic.com" target="_blank">Hypenotic</a>. I had a hand in at least a large chunk of the code/thinking in these projects, but I'm happy to clarify which parts exactly.
      </small>
    </div>
    <comp-cards class="project-cards" :info="projects" path="projects" children="yes"/>
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
}

sup {
  color: #2196f3;
  font-weight: bold;
  font-size: 1rem;
}
</style>
