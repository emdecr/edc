export const state = () => ({
  github: null,
  music: null,
  pages: [],
  posts: null,
  projects: null,
  reads: null,
  shelf: null,
  wpShelf: null,
  fullShelf: null
});

export const mutations = {
  setGithub(state, payload) {
    state.github = payload;
  },
  setMusic(state, payload) {
    state.music = payload;
  },
  setPages(state, payload) {
    // state.pages = payload;
    state.pages = [...payload];
  },
  setPosts(state, payload) {
    // state.pages = payload;
    state.posts = [...payload];
  },
  setProjects(state, payload) {
    state.projects = payload;
  },
  setReads(state, payload) {
    state.reads = payload;
  },
  setShelf(state, payload) {
    state.shelf = payload;
  },
  setWPShelf(state, payload) {
    state.wpShelf = payload;
  },
  setFullShelf(state, payload) {
    state.fullShelf = payload;
  }
};

export const actions = {
  async getPages({ state, commit, dispatch }) {
    if (state.pages.length == 0) {
      await this.$axios
        .$get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
        .then(function(response) {
          commit("setPages", response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  async getPosts({ state, commit, dispatch }) {
    if (state.posts == null) {
      await this.$axios
        .$get(
          process.env.CMS_API_URL + "wp-json/wp/v2/posts?per_page=50&_embed"
        )
        .then(function(response) {
          commit("setPosts", response);
        })
        .catch(function(error) {
          commit("setPosts", null);
          // console.log(error);
        });
    }
  },
  async getProjects({ state, commit, dispatch }) {
    if (state.projects == null) {
      await this.$axios
        .$get(
          process.env.CMS_API_URL +
            "wp-json/wp/v2/project?per_page=50&order=asc&_embed"
        )
        .then(function(response) {
          commit("setProjects", response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  async getSingleProject({ state, commit, dispatch }, theid) {
    if (state.projects == null) {
      await this.$axios
        .$get(
          process.env.CMS_API_URL +
            "wp-json/wp/v2/project/" +
            theid +
            "?per_page=50&_embed"
        )
        .then(function(response) {})
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  async getShelfItems({ state, commit }) {
    if (state.shelf == null) {
      await this.$axios
        .$get(process.env.CMS_API_URL + "/wp-json/edc/v1/pins/")
        .then(function(response) {
          console.log("Hours:" + response.hours, "Mins:" + response.mins);
          var dataObj = JSON.parse(response.body_response);
          commit("setShelf", dataObj.data);
        })
        .catch(function(error) {
          commit("setShelf", null);
          // console.log(error);
        });
    }
  },
  async getWPShelfItems({ state, commit }) {
    if (state.wpShelf == null) {
      await this.$axios
        .$get(
          process.env.CMS_API_URL +
            "/wp-json/wp/v2/shelf-item?per_page=8&_embed"
        )
        .then(function(response) {
          commit("setWPShelf", response);
        })
        .catch(function(error) {
          // console.log(error);
          commit("setWPShelf", null);
        });
    }
  },
  async getAllShelfItems({ state, commit }) {
    if (state.fullShelf == null) {
      await this.$axios
        .$get(
          process.env.CMS_API_URL +
            "/wp-json/wp/v2/shelf-item?per_page=100&_embed"
        )
        .then(function(response) {
          commit("setFullShelf", response);
        })
        .catch(function(error) {
          // console.log(error);
          commit("setFullShelf", null);
        });
    }
  },
  async getMusic({ state, commit, dispatch }) {
    if (state.music == null) {
      await this.$axios
        .$get(
          "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
            process.env.LASTFM_USER +
            "&api_key=" +
            process.env.LASTFM_KEY +
            "&format=json&limit=1"
        )
        .then(function(response) {
          const trackName = response.recenttracks.track[0].name;
          const trackArtist = response.recenttracks.track[0].artist["#text"];
          const trackImage = response.recenttracks.track[0].image[1]["#text"];
          let trackInfo = {
            artist: trackArtist,
            name: trackName,
            image: trackImage
          };
          commit("setMusic", trackInfo);
        })
        .catch(function(error) {
          commit("setMusic", null);
          // console.log("Music error:" + error);
        });
    }
  },
  async getGithub({ state, commit, dispatch }) {
    if (state.github == null) {
      await this.$axios
        .$get("https://api.github.com/users/emdecr/events")
        .then(function(response) {
          commit("setGithub", response);
        })
        .catch(function(error) {
          commit("setGithub", null);
          // console.log("Github error:" + error);
        });
    }
  },
  async getReads({ state, commit, dispatch }) {
    if (state.reads == null) {
      await this.$axios
        .$get(
          process.env.CMS_API_URL +
            "wp-json/wp/v2/read?per_page=50&order=desc&_embed"
        )
        .then(function(response) {
          commit("setReads", response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};

export const getters = {
  getPosts(state) {
    return state.posts;
  },
  getPages: state => slug => state.pages.filter(p => p.slug == slug)[0],
  getProjects(state) {
    return state.projects;
  },
  getShelf(state) {
    if (state.shelf != null) {
      var short = state.shelf.slice(0, 12);
      return short;
    } else {
      return [];
    }
  },
  getWPShelf(state) {
    return state.wpShelf;
  },
  getFullShelf(state) {
    return state.fullShelf;
  },
  getMusic(state) {
    return state.music;
  },
  getReads(state) {
    return state.reads;
  },
  getGithub(state) {
    if (state.github != null) {
      var cut = state.github.slice(0, 5);
      return cut;
    } else {
      return [];
    }
  }
};
