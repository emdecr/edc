<template>
  <main>
    <h1>About</h1>

    <div class="grid">
      <div class="content" v-html="page.content.rendered"></div>
      <div class="side">
        <div class="skills">
          <h2 v-if="meta._page_skills_title !=''" v-html="meta._page_skills_title"></h2>
          <h2 v-else>Key Skills</h2>
          <div class="mono" v-html="meta._page_skills_text"></div>
        </div>
        <div class="learning">
          <h2 v-if="meta._page_learning_title !=''" v-html="meta._page_learning_title"></h2>
          <h2 v-else>Currently Learning</h2>
          <template v-if="meta._page_learning.length > 0">
            <ul class="course-list">
              <li v-for="(course, i) in meta._page_learning" :key="'course'+i" class="mono">
                <span v-html="course.label" class="bold course-skill"></span>
                <div class="course-info">
                  <span>
                    <strong>Course:</strong>
                  </span>
                  <br>
                  <a
                    :href="course.course_link"
                    v-html="course.course_name"
                    class="course-name"
                    target="_blank"
                  ></a>
                  <div class="bar-container">
                    <div class="bar">
                      <span class="bar-progress" :style="{ width: course.course_percent + '%'}"></span>
                    </div>
                    <span class="_percent">{{course.course_percent + ' %'}}</span>
                  </div>
                  <span class="course-updated" v-if="course.course_date">
                    <strong>Updated:</strong>
                    {{course.course_date}}
                  </span>
                </div>
              </li>
            </ul>
          </template>
          <div class="mono" v-html="meta._page_learning_text"></div>
          <template v-if="meta.hasOwnProperty('_page_learning_done')">
            <template v-if="meta._page_learning_done.length > 0">
              <h3>Recently Completed Courses</h3>
              <ul class="course-list">
                <li v-for="(course, i) in meta._page_learning_done" :key="'course'+i" class="mono">
                  <span v-html="course.label" class="bold course-skill"></span>
                  <div class="course-completion">
                    <p>
                      <strong>Course</strong>:
                      <br>
                      <a
                        :href="course.course_link"
                        v-html="course.course_name"
                        class="course-name"
                        target="_blank"
                      ></a>
                    </p>
                    <p>
                      <strong>Date</strong>:
                      <br>
                      {{course.course_date}}
                    </p>
                    <a :href="course.course_cert" class="course-name" target="_blank">Certificate</a>
                  </div>
                </li>
              </ul>
            </template>
          </template>
        </div>
      </div>
    </div>

    <comp-shelf v-if="shelf != null" class="shelf" :shelf="shelf"/>

    <div class="about-bottom grid">
      <section class="music">
        <h2>Recently played...</h2>
        <div class="music-grid grid" v-if="music != null">
          <img :src="music.image" :alt="'Album art for '+music.name">
          <div class="music__deats">
            <span class="mono">{{music.artist}} | {{music.name}}</span>
          </div>
        </div>
        <div v-else>
          <p class="mono">Error loading track.</p>
        </div>
      </section>

      <section class="github">
        <h2>Github activity</h2>
        <ul v-if="github != null">
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
        <p v-else class="mono">Error loading Github data.</p>
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
    await store.dispatch("content/getPages");
    await store.dispatch("content/getGithub");
    await store.dispatch("content/getMusic");
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

.side h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.side h3 {
  font-size: 1.05rem;
  margin-top: 1.5rem;
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
  padding-top: 2.6rem;
}

.skills,
.resume {
  margin-bottom: 2rem;
}

.course-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  li {
    font-size: 0.7rem;
    margin-bottom: 1rem;
  }
}

.course-info,
.course-completion {
  padding-left: 1rem;
  margin-top: 0.5rem;
}

.course-completion {
  margin-top: 0.5rem;
  font-size: 0.7rem;

  p {
    font-size: 0.7rem;
    margin-bottom: 10px;
  }
}

.course-name,
.course-updated {
  margin-top: 0.5rem;
}

.course-skill {
  font-size: 0.85rem;
}

.course-updated {
  display: block;
}

.bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.8rem;
}

.bar {
  width: 85%;
  position: relative;
  height: 12px;
  text-align: right;
  padding: 0.1rem 0.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid rgba(228, 228, 228, 0.5);
}
.bar-progress {
  position: absolute;
  left: 0;
  width: 50%;
  background: #e3e3e3;
  height: 100%;
  z-index: 0;
}
._percent {
  font-size: 0.6rem;
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
    column-gap: 1rem;
    grid-template-columns: 1fr 6fr;
  }
}
</style>
