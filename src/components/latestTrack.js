import React    from 'react';
import axios from 'axios';

// https://codepen.io/jackrugile/pen/CkAbG?q=sound&limit=all&type=type-pens

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trackName: '',
            trackArtist: '',
            trackImage: ''
        };
    }

    componentWillMount() {
        axios.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=emdecr&api_key=1e7b9d74a65097851e5895356eae94a5&format=json&limit=1')
        .then((result)=> {
          console.log(result.data.recenttracks.track[0])
          this.setState({
            trackName: result.data.recenttracks.track[0].name,
            trackArtist: result.data.recenttracks.track[0].artist['#text'],
            trackImage: result.data.recenttracks.track[0].image[1]['#text']
          });               
        })

    }

    render() {
        return (
            <div>
                <h2>Latest Track</h2>
                <img src={this.state.trackImage} alt='`${this.state.trackName} - ${this.state.trackArtist}`'/>
                <p>{this.state.trackName} by {this.state.trackArtist}</p>
            </div>
        );
    }
}

export default Track;