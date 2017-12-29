import axios from 'axios';

import * as types from '../constants/ActionTypes'

export function fetchPages() {
    const url = 'https://data.emilydelacruz.com/wp-json/wp/v2/pages?_embed';
    const request = axios.get(url)
    // .then((result)=> {
    //     console.log('Action ', result.data );
    //     return result.data             
    // });

    // console.log('Action ', request );

    return {
        type: types.FETCH_PAGES,
        payload: request
    };
}

export function fetchShelf() {
    const url = 'https://api.pinterest.com/v1/boards/emdecr/edccom-shelf/pins/?access_token=AYiwWgzbi8ufU79rb9qi-8do2GOmFQQ1Oo_pWrFElLAXSeAv0gAAAAA&fields=id,url,link,note,image,created_at,metadata,attribution';
    const request = axios.get(url)
    .then((result)=> {
      console.log('action',result.data.data)
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