import React    	from 'react';
import { connect } from 'react-redux';
import { fetchShelf, fetchTracks, fetchGithub } from '../../actions'; 
// import axios from 'axios';
// import DataStore    from './../../stores/DataStore.js';
import PinShelf 	from './components/shelf/index.js';
import Track 	    from '../../components/latestTrack.js';
import Github 	    from '../../components/github.js';
// import Tweet 		from './../../components/twitter.js';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const DefaultContainer = styled.div`
max-width: 960px;
margin: 0 auto;
padding: 0 24px;
@media (min-width: 1080px) {
    padding: 0;
}
`;

const Buffer = styled.div`
padding: 24px 0;
@media (min-width: 1080px) {
    padding: 100px 0 50px;
}
`;

const ContentContainer = styled.div`
font-family: 'Roboto', sans-serif;
font-size: 1.3rem;
line-height: 1.7;
p {
    font-family: 'Roboto', sans-serif;
}
`;

const SmallContainer = styled.div`
max-width: 720px;
`;

const Padding40 = styled.div`
padding: 40px 0;
@media (min-width: 1080px) {
    padding: 40px 0;
}
`;

const Padding24 = styled.div`
padding: 24px 0;
@media (min-width: 1080px) {
    padding: 24px 0;
}
`;

const Flex_2_1 = styled.div`
@media (min-width: 1080px) {
    display:flex;
    justify-content: space-between;
    >div {
        width: 46.8%;
    }
}
`;

const Flex__2_3__1_3__1 = styled.div`
@media (min-width: 1080px) {
    display:flex;
    justify-content: space-between;
    >div:first-child {
        width: 60%;
    }
    >div:last-child {
        width: 32%;
    }
}
`;

const TechStackCont = styled.div`
h2, h3, h4 {
    font-family: 'Roboto Mono', sans-serif;
}
`;

const DefaultButton = styled.a`
display: inline-block;
border: 1px solid blue;
color: blue;
padding: 8px 32px;
margin: 8px 0 0;
font-family: 'Roboto Mono', sans-serif;
@media (max-width: 400px) {
    font-size: 18px;
    padding: 8px 24px;
    margin: 8px 0 24px;
}
&:hover {
    background: blue;
    color: white;
    border: 1px solid blue;
}
`;

const List = styled.ul`
list-style-type: none;
margin: 0;
padding: 24px 0 0;
li {
    display: inline-block;
    @media (max-width: 400px) {
        display: block;
    }
}
`;

const ListItem = styled.li`
margin-bottom: 8px;
margin-right: 32px;
`;

class About extends React.Component {

    componentDidMount() {
        if (this.props.shelf.length > 0) {
            // console.log('shelf exists', this.props.shelf)
            return
        } else {
            // console.log('shelf does not exists')
            this.props.fetchShelf();
        }
        if (this.props.tracks.hasOwnProperty('name')) {
            // console.log('tracks exists', this.props.tracks)
            return
        } else {
            // console.log('tracks does not exists')
            this.props.fetchTracks();
        }
        if (this.props.github.length > 0) {
            // console.log('github exists', this.props.github)
            return
        } else {
            // console.log('github does not exists')
            this.props.fetchGithub();
        }
        
    }

    render() {
        
        if (this.props.data != undefined){
            let AboutContent = this.props.data.content.rendered;
            let TechStack = this.props.data.meta_box.edc_about_tech_stack;
            return (
                <DefaultContainer>
                    <Buffer>
                        <h1>About</h1>
                        <ContentContainer>
                            <Flex__2_3__1_3__1>
                                <div>
                                    {ReactHtmlParser(AboutContent)}
                                    <div>
                                        <DefaultButton href="mailto:hello@emilydelacruz.com" target="_blank">hello@emilydelacruz.com</DefaultButton>
                                        <List>
                                            <ListItem><a href="https://twitter.com/emdecr" target="_blank"><i class="fab fa-twitter" aria-hidden="true"></i> twitter</a></ListItem>
                                            <ListItem><a href="https://github.com/emdecr" target="_blank"><i class="fab fa-github" aria-hidden="true"></i> github</a></ListItem>
                                            <ListItem><a href="https://medium.com/@emdecr" target="_blank"><i class="fab fa-medium" aria-hidden="true"></i> medium</a></ListItem>
                                        </List>
                                    </div>
                                </div>
                                <TechStackCont>{ReactHtmlParser(TechStack)}</TechStackCont>
                            </Flex__2_3__1_3__1>
                        </ContentContainer>
                        <Padding40><PinShelf data={this.props.data} shelf={this.props.shelf}/></Padding40>
                        <Flex_2_1>
                            <Padding40><Github data={this.props.data} github={this.props.github}/></Padding40>
                            <Padding40><Track data={this.props.data} tracks={this.props.tracks}/></Padding40>
                        </Flex_2_1>
                    </Buffer>
                </DefaultContainer>
            );
        } else {
            return (
                <div></div>
            )
        }
        

    }
}

const mapStateToProps = function(state){
    return {
        data: state.pages['about'],
        shelf: state.shelf,
        tracks: state.tracks,
        github: state.github
    }
}
  

export default connect(mapStateToProps, { fetchShelf, fetchTracks, fetchGithub })(About)
// export default About;