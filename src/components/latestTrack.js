import React    from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FlexAICenter = styled.div`
@media (min-width: 700px) {
    display: flex;
    align-items: center;
}
`;

const TrackImageEl = styled.img`
@media (min-width: 700px) {
    margin-right: 16px;
}
`;

// https://codepen.io/jackrugile/pen/CkAbG?q=sound&limit=all&type=type-pens

class Track extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         trackName: '',
    //         trackArtist: '',
    //         trackImage: ''
    //     };
    // }

    // componentDidMount() {
    //     axios.get('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=emdecr&api_key=1e7b9d74a65097851e5895356eae94a5&format=json&limit=1')
    //     .then((result)=> {
    //     //   console.log(result.data.recenttracks.track[0])
    //       this.setState({
    //         trackName: result.data.recenttracks.track[0].name,
    //         trackArtist: result.data.recenttracks.track[0].artist['#text'],
    //         trackImage: result.data.recenttracks.track[0].image[1]['#text']
    //       });               
    //     })

    // }

    render() {

        // Object = {artist:trackArtist, name:trackName, image:trackImage}
        let props = this.props
        console.log(props.tracks);
        if (props.tracks.hasOwnProperty('name')) {
            function TrackImage() {
                if (props.tracks['image'] != '') {
                    return <TrackImageEl src={props.tracks['image']} alt={'Album art for ' + props.tracks['name'] + ' by ' + props.tracks['artist']}/>;
                }
                return <span></span>;
            }
    
            return (
                <div>
                    <h2>Latest Track</h2>
                    <FlexAICenter>
                        <TrackImage/>
                        <p>{props.tracks['name']} by {props.tracks['artist']}</p>
                    </FlexAICenter>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
        
    }
}

export default Track;