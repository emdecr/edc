import React        from 'react';
import { connect } from 'react-redux';
// import DataStore    from './../../stores/DataStore.js';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const DefaultContainer = styled.div`
max-width: 960px;
margin: 0 auto;
padding: 0 24px;
@media (min-width: 700px) {
    padding: 0;
}
`;

const Buffer = styled.div`
padding: 0;
@media (min-width: 700px) {
    padding: 100px 0 50px;
}
`;

const ContentContainer = styled.div`
    p {
        word-break: break-all;
    }
`;

const LineBreak = styled.p`
word-break: break-all;
`;

class Home extends React.Component {

    render() {
    	// let allData = DataStore.getAll();
        // console.log('New site coming soon...'); 
        // console.log(allData);
        if (this.props.data != undefined){
            let HomeContent = this.props.data.content.rendered;
            return (
                <DefaultContainer>
                    <Buffer>
                        <ContentContainer>{ReactHtmlParser(HomeContent)}</ContentContainer>
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
        data: state.pages['home']
    }
}
  

export default connect(mapStateToProps)(Home)
// export default Home;