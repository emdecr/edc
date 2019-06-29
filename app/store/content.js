export const state = () => ({
    github: null,
    music: null,
    pages: null,
    projects: null,
    shelf: null
})

export const mutations = {
    setGithub(state, payload) {
        state.github = payload;
    },
    setMusic(state, payload) {
        state.music = payload;
    },
    setPages(state, payload) {
        state.pages = payload;
    },
    setProjects(state, payload) {
        state.projects = payload;
    },
    setShelf(state, payload) {
        state.shelf = payload;
    }
}

export const actions = {
    async getPages ({commit, dispatch}) {
        await this.$axios.$get(process.env.CMS_API_URL + '/wp-json/wp/v2/pages?per_page=50')
        .then(function (response) {
            commit('setPages', response)
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    async getProjects ({commit, dispatch}) {
        await this.$axios.$get(process.env.CMS_API_URL + '/wp-json/wp/v2/project?per_page=50&_embed')
        .then(function (response) {
            commit('setProjects', response)
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    async getSingleProject ({commit, dispatch}, theid) {
        await this.$axios.$get(process.env.CMS_API_URL + '/wp-json/wp/v2/project/'+theid+'?per_page=50&_embed')
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    async getShelfItems ({commit, dispatch}) {
        await this.$axios.$get(process.env.PINTEREST_BASE+'?access_token='+process.env.PINTEREST_ACC_TOKEN+'&fields=id,url,link,note,image,created_at,metadata,attribution')
        .then(function (response) {
            commit('setShelf', response)
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    async getMusic ({commit, dispatch}) {
        await this.$axios.$get( 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+process.env.LASTFM_USER+'&api_key='+process.env.LASTFM_KEY+'&format=json&limit=1')
        .then(function (response) {
            const trackName = response.recenttracks.track[0].name;
            const trackArtist = response.recenttracks.track[0].artist['#text'];
            const trackImage = response.recenttracks.track[0].image[1]['#text'];
            let trackInfo = {artist:trackArtist, name:trackName, image:trackImage};
            commit('setMusic', trackInfo );
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    async getGithub ({commit, dispatch}) {
        await this.$axios.$get('https://api.github.com/users/emdecr/events')
        .then(function (response) {
            commit('setGithub', response)
        })
        .catch(function (error) {
            console.log(error)
        })
    },
}

export const getters = {
    getPages(state){
        return state.pages;
    },
}