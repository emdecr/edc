import React 		from 'react';
import axios 		from 'axios';
import { timeAgo } 	from './../base/helpers';
import { ify } 		from './../base/helpers';

class Tweet extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     tweets: {}
  //   }
  // }

  // get data ready before rendering
  componentWillMount() {
    var t = this;

    // GET Pinterest Shelf
    axios.get('https://api.pinterest.com/v1/boards/emdecr/edccom-shelf/pins/?access_token=AXIBjGg-3D-G49apiRgQZPKfIaQ6FKUeaAd2D1FDzUV-V4ApqQAAAAA&fields=id,url,link,note,image,created_at,metadata', {
      
    })
    .then(function (result) {
      console.log(result);
      // set state with retrieved tweet data
      t.setState({
        tweets: result.data
      });
    });

    // GET latest track from Last.fm
    axios.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=emdecr&api_key=1e7b9d74a65097851e5895356eae94a5&format=json&limit=1', {
      
    })
    .then(function (result) {
      console.log(result);
      // set state with retrieved tweet data
      t.setState({
        tweets: result.data
      });
    });

    // GET most recent events from Github
    axios.get('https://api.github.com/users/emdecr/events', {
      
    })
    .then(function (result) {
      console.log(result);
      // set state with retrieved tweet data
      t.setState({
        tweets: result.data
      });
    });
  }

  render() {   

    var th = this;

    return (
      <div>
        <h1>tweet</h1>
      </div> 
    )
  }    
}

export default Tweet;  