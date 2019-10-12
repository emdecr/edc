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
    async getPages ({state, commit, dispatch}) {
        if (state.pages == null) {
            await this.$axios.$get(process.env.CMS_API_URL + 'wp-json/wp/v2/pages?per_page=50')
            .then(function (response) {
                commit('setPages', response)
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    async getProjects ({state, commit, dispatch}) {
        if (state.projects == null) {
            await this.$axios.$get(process.env.CMS_API_URL + 'wp-json/wp/v2/project?per_page=50&_embed')
            .then(function (response) {
                commit('setProjects', response)
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    async getSingleProject ({state, commit, dispatch}, theid) {
        if (state.projects == null) {
            await this.$axios.$get(process.env.CMS_API_URL + 'wp-json/wp/v2/project/'+theid+'?per_page=50&_embed')
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    async getShelfItems ({state, commit}) {
        if (state.shelf == null) {
            await this.$axios.$get(process.env.CMS_API_URL + '/wp-json/edc/v1/pins/')
            .then(function (response) {
                console.log('Hours:'+response.hours,'Mins:'+response.mins,);
                var dataObj = JSON.parse(response.body_response);
                commit('setShelf', dataObj.data);
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    async getMusic ({state, commit, dispatch}) {
        if (state.music == null) {
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
        }
    },
    async getGithub ({state, commit, dispatch}) {
        if (state.github == null) {
            await this.$axios.$get('https://api.github.com/users/emdecr/events')
            .then(function (response) {
                commit('setGithub', response)
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
}

export const getters = {
    getPages(state){
        return state.pages;
    },
    getShelf(state){
        var short = state.shelf.slice(0, 24);
        return short;
    },
    getMusic(state){
        return state.music;
    },
    getGithub(state){
        var cut = state.github.slice(0, 5);
        return cut;
    },
}