<template>
  <main class>
    <section class="intro">
      <!-- <img src="~/assets/images/connect-extend.svg" alt> -->
      <nuxt-link to="/" class="home-link-index">
        <img src="~/assets/images/connect-extend.svg" alt>
      </nuxt-link>
      <span class="name">Emily Dela Cruz</span>
      <span class="pronouns">
        <a href="https://www.mypronouns.org/she-her" target="_blank">she/her</a>
      </span>
      <div class="content" v-html="page.content.rendered"></div>
      <nuxt-link to="/about">Learn more...</nuxt-link>
      <!-- <div class="btns">
        <nuxt-link class="btn" to="/about">My journey thus far...</nuxt-link>
        <nuxt-link class="btn" to="/projects">Opportunities and challenges</nuxt-link>
      </div>-->
    </section>
    <section class="projects">
      <h2>Projects</h2>
      <comp-cards class="project-cards" :info="projects" path="projects" children="no"/>
      <nuxt-link to="/projects">View all projects</nuxt-link>
    </section>
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

.content {
  max-width: 650px;
  margin: 1rem 0;
}

.intro img {
  width: 50px;
  height: auto;
  display: block;
  padding-bottom: 100px;
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

.projects {
  margin-top: 4rem;
}

@media only screen and (min-width: 1024px) {
  .project-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;
    margin-bottom: 2rem;
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  }
}

.home-link-index {
  display: none;
}

@media only screen and (max-width: 500px) {
  .home-link-index {
    display: block;
    margin-bottom: 2rem;
    width: 40px;
    height: auto;
    border: none;
  }
}

.project-container {
  > * {
    border: none;
  }
}
</style>
