import axios from "axios";
import content from "../apis/content";
import * as types from "./types";

export const getPages = () => async (dispatch, getState) => {
  console.log("DOING ACTION");
  const response = await content.get("wp-json/wp/v2/pages?per_page=50");

  const data = response.data;

  console.log("DONE ACTION");
  dispatch({ type: types.GET_PAGES, payload: data });
};

export const getPosts = () => async (dispatch, getState) => {
  const response = await content.get("wp-json/wp/v2/posts?per_page=50&_embed");

  const data = response.data;

  dispatch({ type: types.GET_POSTS, payload: data });
};

export const getReads = () => async (dispatch, getState) => {
  let reads;
  let currently;
  await content
    .get("wp-json/wp/v2/read?per_page=100&_embed")
    .then(function(response) {
      const posts = response.data;
      reads = posts.filter((item, index, arr) => !item.flag.includes(24));
      currently = posts.filter((item, index, arr) => item.flag.includes(24))[0];
    })
    .catch(function(error) {
      console.log("Records GET error: " + error);
      reads = null;
      currently = null;
    });

  const data = {
    reads,
    currently
  };

  dispatch({ type: types.GET_READS, payload: data });
};

export const getGithub = () => async (dispatch, getState) => {
  let github;
  await axios
    .get("https://api.github.com/users/emdecr/events")
    .then(function(response) {
      github = response.data;
    })
    .catch(function(error) {
      github = null;
      console.log("Github GET error: " + error);
    });

  dispatch({ type: types.GET_GITHUB, payload: github });
};

export const getMusic = () => async (dispatch, getState) => {
  let track;
  await axios
    .get(
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
        process.env.LASTFM_USER +
        "&api_key=" +
        process.env.LASTFM_KEY +
        "&format=json&limit=1"
    )
    .then(function(response) {
      const trackName = response.data.recenttracks.track[0].name;
      const trackArtist = response.data.recenttracks.track[0].artist["#text"];
      const trackImage = response.data.recenttracks.track[0].image[1]["#text"];
      let trackInfo = {
        artist: trackArtist,
        name: trackName,
        image: trackImage
      };
      track = trackInfo;
    })
    .catch(function(error) {
      console.log("Music GET error: " + error);
      track = null;
    });

  dispatch({ type: types.GET_MUSIC, payload: track });
};
