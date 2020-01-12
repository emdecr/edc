<template>
  <main>
    <h1>Projects</h1>
    <div class="content">
      <small>
        <sup>*</sup> via
        <a href="https://hypenotic.com" target="_blank">Hypenotic</a>. I had a hand in at least a large chunk of the code/thinking in these projects, but I'm happy to clarify which parts exactly.
      </small>
    </div>
    <div class="project-container flex-all flex--jc-sb">
      <nuxt-link :to="'/projects/'+item.slug" v-for="(item, i) in projects" :key="'item-'+i" class>
        <img v-if="item.hasOwnProperty('_embedded')" :src="image(item)" :alt="item.title.rendered">
        <div class="title" v-if="item.parent != 0">
          <h3 v-html="item.title.rendered"></h3>
          <sup>*</sup>
        </div>
        <h3 v-if="item.parent == 0" v-html="item.title.rendered"></h3>
      </nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
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

.title {
  h3 {
    display: inline-block;
  }
}

.project-container {
  flex-wrap: wrap;
  > * {
    width: 30%;
    border: none;
    margin-bottom: 2rem;
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  }
}
</style>
