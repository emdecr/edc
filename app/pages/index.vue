<template>
  <main class>
    <section class="intro">
      <span class="name">emily dela cruz</span>
      <span class="pronouns">she/her</span>
      <div class="content" v-html="page.content.rendered"></div>

      <h2>Projects</h2>
      <div class="project-container flex-all flex--jc-sb">
        <template v-for="(item, i) in projects">
          <nuxt-link :to="'/projects/'+item.slug" v-if="item.parent == 0" :key="'item-'+i" class>
            <img
              v-if="item.hasOwnProperty('_embedded')"
              :src="image(item)"
              :alt="item.title.rendered"
            >
            <h3 v-html="item.title.rendered"></h3>
          </nuxt-link>
        </template>
      </div>
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
    await store.dispatch("content/getPages");
    await store.dispatch("content/getProjects");
  },
  computed: {
    page() {
      return this.$store.getters["content/getPages"]("home");
    },
    projects() {
      return this.$store.getters["content/getProjects"];
    }
  },
  methods: {
    image(i) {
      if (i.hasOwnProperty("_embedded")) {
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
  font-weight: bold;
  font-style: normal;
  font-size: 30px;
  color: rgb(37, 37, 37);
}

.pronouns {
  font-size: 0.8rem;
  margin-left: 0.5rem;
  display: inline-block;
  // font-style: italic;
  font-family: "input-mono", monospace;
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

.project-container {
  > * {
    width: 30%;
    border: none;
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  }
}
</style>
