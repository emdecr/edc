import React    from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

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

const ContentContainer = styled.div`
font-family: 'Roboto', sans-serif;
font-size: 1.2rem;
line-height: 1.7;
p {
    font-family: 'Roboto', sans-serif;
}
`;

// https://codepen.io/jackrugile/pen/CkAbG?q=sound&limit=all&type=type-pens

class Track extends React.Component {

    render() {

        // Object = {artist:trackArtist, name:trackName, image:trackImage}
        let props = this.props
        // console.log(props.tracks);
        if (props.tracks.hasOwnProperty('name')) {
            function TrackImage() {
                if (props.tracks['image'] != '') {
                    return <TrackImageEl src={props.tracks['image']} alt={'Album art for ' + props.tracks['name'] + ' by ' + props.tracks['artist']}/>;
                }
                return <span></span>;
            }
    
            return (
                <div>
                    <h3>Latest Track</h3>
                    <ContentContainer>
                        {ReactHtmlParser(this.props.data.meta_box.edc_about_track_copy)}
                    </ContentContainer>
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