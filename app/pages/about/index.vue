<template>
  <main>
    <h1>About</h1>

    <div class="content" v-html="page.content.rendered"></div>

    <comp-shelf class="shelf" :shelf="shelf"/>

    <div class="about-bottom grid">
      <section class="music">
        <h2>Recently played...</h2>
        <div class="music-grid grid">
          <img :src="music.image" :alt="'Album art for '+music.name">
          <div class="music__deats">
            <span>{{music.artist}} | {{music.name}}</span>
          </div>
        </div>
      </section>

      <section class="github">
        <h2>Github activity</h2>
        <ul>
          <template target="_blank" v-for="(event, i) in github">
            <li v-if="event.type == 'PushEvent'" :key="'event-'+i">
              {{type(event)}} | R:
              <a :href="repoURL(event)" target="_blank>">{{event.repo.name}}</a>
              , B: {{repoBranch(event)}}, CM:
              <a
                :href="'https://github.com/' + event.repo.name + '/commit/' + event.payload.commits[0].sha"
                target="_blank>"
              >{{event.payload.commits[0].message}}</a>
            </li>
            <li v-else :key="'event-'+i">
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

.shelf {
  margin-top: 4rem;
}

.about-bottom {
  grid-template-columns: 1fr 1fr;
}

.github {
  li {
    font-size: 0.8rem;
    margin-bottom: 10px;
  }
}

.music-grid {
  grid-template-columns: 2fr 8fr;
  span {
    font-size: 0.8rem;
  }
}
</style>
