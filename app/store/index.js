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
    let check = localStorage.getItem("siteTheme");
    if (check !== null) {
      commit("setMode", true);
    } else {
      return;
    }
  }
};

export const getters = {
  getMode(state) {
    return state.mode;
  }
};
