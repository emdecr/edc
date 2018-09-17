import axios from 'axios';

import * as types from '../constants/ActionTypes'

export function fetchPages() {
    const url = 'https://data.emilydelacruz.com/wp-json/wp/v2/pages?_embed';
    const request = axios.get(url)
    return {
        type: types.FETCH_PAGES,
        payload: request
    };
}

export function fetchProjects() {
    const url = 'https://data.emilydelacruz.com/wp-json/wp/v2/project?_embed';
    const request = axios.get(url)
    return {
        type: types.FETCH_PROJECTS,
        payload: request
    };
}

export function fetchSingleProject(id) {
    const theid = id;
    const url = 'https://data.emilydelacruz.com/wp-json/wp/v2/project'+theid;
    const request = axios.get(url)
    return {
        type: types.FETCH_SINGLE_PROJECT,
        payload: request
    };
}

export function fetchShelf() {
    const url = 'https://api.pinterest.com/v1/boards/emdecr/edccom-shelf/pins/?access_token=AjcjxT4UUHC1T6G4IzH3-i6BU0RtFVULQ0-3ffVDq2AINKAphQL4ADAAAAAbQ81FfleAKakAAAAA&fields=id,url,link,note,image,created_at,metadata,attribution';
    const request = axios.get(url)
    .then((result)=> {
    //   console.log('action',result.data.data)
        if (result.data.data.length > 8) {
            let items = result.data.data.slice(0, 8)
            return items
        } else {
            let items = result.data.data
            return items
        }              
    })

    return {
        type: types.FETCH_SHELF_ITEMS,
        payload: request
    };
}

export function fetchTracks() {
    const url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=emdecr&api_key=1e7b9d74a65097851e5895356eae94a5&format=json&limit=1';
    const request = axios.get(url)
    .then((result)=> {
        // console.log('action',result.data)
        const trackName = result.data.recenttracks.track[0].name
        const trackArtist = result.data.recenttracks.track[0].artist['#text']
        const trackImage = result.data.recenttracks.track[0].image[1]['#text']
        let trackInfo = {artist:trackArtist, name:trackName, image:trackImage}
        // console.log('action',trackInfo)
        return trackInfo         
    })

    return {
        type: types.FETCH_TRACKS,
        payload: request
    };
}

export function fetchGithub() {
    const url = 'https://api.github.com/users/emdecr/events';
    const request = axios.get(url)
    .then((result)=> {
        console.log('action',result.data)
        let latest = result.data.slice(0, 5)
        return latest           
    })

    return {
        type: types.FETCH_GITHUB_EVENTS,
        payload: request
    };
}