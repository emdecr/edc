<template>
  <main>
    <h1>About</h1>

    <div class="grid">
      <div class="content" v-html="page.content.rendered"></div>
      <div class="side">
        <div class="resume">
          <h2>
            <a :href="meta._page_resume" target="_blank">
              Resume
              <!-- <i class="material-icons">description</i> -->
              <i class="material-icons">open_in_new</i>
            </a>
          </h2>
        </div>
        <div class="skills">
          <h2 v-if="meta._page_skills_title !=''" v-html="meta._page_skills_title"></h2>
          <h2 v-else>Key Skills</h2>
          <div class="mono" v-html="meta._page_skills_text"></div>
        </div>
        <div class="learning">
          <h2 v-if="meta._page_learning_title !=''" v-html="meta._page_learning_title"></h2>
          <h2 v-else>Currently Learning</h2>
          <div class="mono" v-html="meta._page_learning_text"></div>
        </div>
      </div>
    </div>

    <comp-shelf class="shelf" :shelf="shelf"/>

    <div class="about-bottom grid">
      <section class="music">
        <h2>Recently played...</h2>
        <div class="music-grid grid">
          <img :src="music.image" :alt="'Album art for '+music.name">
          <div class="music__deats">
            <span class="mono">{{music.artist}} | {{music.name}}</span>
          </div>
        </div>
      </section>

      <section class="github">
        <h2>Github activity</h2>
        <ul>
          <template target="_blank" v-for="(event, i) in github">
            <li v-if="event.type == 'PushEvent'" :key="'event-'+i" class="mono">
              {{type(event)}} | R:
              <a :href="repoURL(event)" target="_blank>">{{event.repo.name}}</a>
              , B: {{repoBranch(event)}}, CM:
              <a
                :href="'https://github.com/' + event.repo.name + '/commit/' + event.payload.commits[0].sha"
                target="_blank>"
              >{{event.payload.commits[0].message}}</a>
            </li>
            <li v-else :key="'event-'+i" class="mono">
              {{type(event)}} | R:
              <a :href="repoURL(event)" target="_blank>">{{event.repo.name}}</a>
            </li>
          </template>
        </ul>
      </section>
    </div>
  </main>
</template>

<script>
import Shelf from "~/components/shelf.vue";
export default {
  components: {
    "comp-shelf": Shelf
  },
  async fetch({ store }) {
    await store.dispatch("content/getGithub");
    await store.dispatch("content/getMusic");
    await store.dispatch("content/getPages");
    await store.dispatch("content/getWPShelfItems");
  },
  head() {
    return {
      title: "Emily Dela Cruz | About"
    };
  },
  methods: {
    repoBranch(event) {
      let branchArray = event.payload.ref.split("/");
      return branchArray[2];
    },
    repoURL(event) {
      return "https://github.com/" + event.repo.name;
    },
    type(event) {
      let newType = event.type.replace(/([A-Z])/g, " $1").trim();
      return newType.replace(" Event", "");
    }
  },
  computed: {
    github() {
      return this.$store.getters["content/getGithub"];
    },
    music() {
      return this.$store.getters["content/getMusic"];
    },
    page() {
      return this.$store.getters["content/getPages"]("about");
    },
    shelf() {
      return this.$store.getters["content/getWPShelf"];
    },
    meta() {
      return this.page.meta_box;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}
@media only screen and (min-width: 500px) {
  h1 {
    visibility: hidden;
    width: 1px;
    height: 1px;
    overflow: hidden;
    margin-bottom: 0;
  }
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

main {
  max-width: 1000px;
  margin: 0 auto;
}

@media only screen and (min-width: 1024px) {
  .grid {
    grid-template-columns: 8fr 4fr;
    grid-column-gap: 4rem;
  }
}

.side {
  padding-top: 2.8rem;
}

.skills,
.resume {
  margin-bottom: 2rem;
}

.content {
  // max-width: 650px;
  padding: 2rem 0;
  padding: 0;
}

.shelf {
  margin-top: 4rem;
}

.github {
  li {
    font-size: 0.8rem;
    margin-bottom: 10px;
  }
}

.music-grid {
  span {
    font-size: 0.8rem;
  }
}

@media only screen and (max-width: 700px) {
  .about-bottom {
    > * {
      margin-bottom: 2rem;
    }
  }
}

@media only screen and (min-width: 700px) {
  .about-bottom {
    grid-template-columns: 1fr 1fr;
  }

  .music-grid {
    grid-template-columns: 2fr 8fr;
  }
}
</style>
