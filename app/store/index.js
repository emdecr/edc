export const state = () => ({
  mode: null
});

export const mutations = {
  setMode(state, payload) {
    state.mode = payload;
  }
};

export const actions = {
  async getMode({ state, commit, dispatch }) {
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
  }
};

export const getters = {
  // getPages(state){
  //     return state.pages;
  // },
};
