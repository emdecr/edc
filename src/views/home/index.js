import React        from 'react';
import { connect } from 'react-redux';
// import DataStore    from './../../stores/DataStore.js';
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

const LineBreak = styled.p`
word-break: break-all;
`;

class Home extends React.Component {

    render() {
    	// let allData = DataStore.getAll();
        // console.log('New site coming soon...'); 
        // console.log(allData);
        return (
            <DefaultContainer>
                <Buffer>
                    <LineBreak>011101010110111001100100011001010111001000100000011000110110111101101110011100110111010001110010011101010110001101110100011010010110111101101110001011100010000001100010011100100110001000101110</LineBreak>
                    <p>under construction. brb.</p>
                    <p><a href="https://twitter.com/emdecr" target="_blank">twitter</a > | <a href="https://github.com/emdecr" target="_blank">github</a></p>
                </Buffer>
            </DefaultContainer>
        );
    }
}

const mapStateToProps = function(state){
    return {
        data: state.pages['home']
    }
}
  

export default connect(mapStateToProps)(Home)
// export default Home;