import axios from 'axios';
import alt   from './../alt/Alt.js';

class DataActions {

    constructor() {
        // Replace this with your WP installation url
        // const appUrl = 'http://edc.dev/cms'; 
        const appUrl = 'https://emilydelacruz.com/cms'; 

        this.pagesEndPoint = `${appUrl}/wp-json/wp/v2/pages`; // Endpoint for getting Wordpress Pages
        this.postsEndPoint = `${appUrl}/wp-json/wp/v2/posts`; // Endpoint for getting Wordpress Posts
        // this.moviesEndPoint = `${appUrl}/wp-json/wp/v2/movies`; // Endpoint for getting Wordpress Movies CPT

        // APIs
        // Get latest tweet
        // this.twitterEndPoint = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=emdecr&count=1`; 
        // Get Pinterest shelf items
        // this.pinterestEndPoint = `https://api.pinterest.com/v1/boards/emdecr/edccom-shelf/pins/?access_token=AXIBjGg-3D-G49apiRgQZPKfIaQ6FKUeaAd2D1FDzUV-V4ApqQAAAAA&fields=id,url,link,note,image,created_at,metadata`;
        // Get most recently played track
        // this.lastfmEndPoint = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=emdecr&api_key=1e7b9d74a65097851e5895356eae94a5&format=json&limit=1`; 
        // Get 'currently reading' list
        // this.pagesEndPoint = `https://www.goodreads.com/review/list?key=LdHzVtyebNelexHQCBrdg&id=3048074-emily&shelf=currently-reading`; 
	}
    
    // Method for getting data from the provided end point url
    api(endPoint) {
        return new Promise((resolve, reject) => {
            axios.get(endPoint).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });	
        });		
    }

    // Method for getting Pages data
    getPages(cb){
        this.api(this.pagesEndPoint).then((response)=>{
            this.getPosts(response, cb)
        });
    }

    // Method for getting Posts data
    getPosts(pages, cb){
        this.api(this.postsEndPoint).then((response)=>{
            const posts = response
            const payload 	= { pages, posts };

            // this.getMovies(pages, posts, cb)
            
            this.getSuccess(payload); // Pass returned data to the store
            cb(payload); // This callback will be used for dynamic route building
        });
    }

    // Method for getting Movies data
    // getMovies(pages, posts, cb){
    //     this.api(this.moviesEndPoint).then((response)=>{
    //         const movies    = response
    //         const payload   = { pages, posts, movies };
            
    //         this.getSuccess(payload); // Pass returned data to the store
    //         cb(payload); // This callback will be used for dynamic route building
    //     });
    // }

    // This returnes an object with Pages and Posts data together
    // The Alt Store will listen for this method to fire and will store the returned data
    getSuccess(payload){
        // console.log('hey');
        return payload;
    }
}

export default alt.createActions(DataActions);