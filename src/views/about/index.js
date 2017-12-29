import React    	from 'react';
import { connect } from 'react-redux';
import { fetchShelf } from '../../actions'; 
import axios from 'axios';
// import DataStore    from './../../stores/DataStore.js';
import PinShelf 	from './components/shelf/index.js';
import Track 	    from '../../components/latestTrack.js';
import Github 	    from '../../components/github.js';
// import Tweet 		from './../../components/twitter.js';
import styled from 'styled-components';

const DefaultContainer = styled.div`
max-width: 960px;
margin: 0 auto;
padding: 0 24px;
@media (min-width: 700px) {
    padding: 0;
}
`;

const Buffer = styled.div`
padding: 50px 0;
@media (min-width: 700px) {
    padding: 100px 0 50px;
}
`;

const Padding40 = styled.div`
padding: 40px 0;
@media (min-width: 700px) {
    padding: 40px 0;
}
`;

const Padding24 = styled.div`
padding: 24px 0;
@media (min-width: 700px) {
    padding: 24px 0;
}
`;

const Flex_2_1 = styled.div`
@media (min-width: 700px) {
    display:flex;
    justify-content: space-between;
    >div {
        width: 48%;
    }
}
`;


class About extends React.Component {

    componentDidMount() {
        if (this.props.shelf.length > 0) {
            console.log('shelf exists', this.props.shelf)
            return
        } else {
            console.log('shelf does not exists')
            this.props.fetchShelf();
        }
        
    }

    render() {
            
        return (
            <DefaultContainer>
                <Buffer>
                    <h1>About</h1>
                    <div>

                    </div>
                    <PinShelf shelf={this.props.shelf}/>
                    <Flex_2_1>
                        <Padding40><Track/></Padding40>
                        <Padding40><Github/></Padding40>
                    </Flex_2_1>
                </Buffer>
            </DefaultContainer>
        );

    }
}

const mapStateToProps = function(state){
    return {
        data: state.pages['about'],
        shelf: state.shelf
    }
}
  

export default connect(mapStateToProps, { fetchShelf })(About)
// export default About;