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

const ContentContainer = styled.div`
font-family: 'Roboto', sans-serif;
font-size: 1.3rem;
line-height: 1.7;
h2 {
    font-family: 'Roboto Mono', sans-serif;
}
p {
    font-family: 'Roboto', sans-serif;
}
`;

const Buffer = styled.div`
padding: 50px 0;
@media (min-width: 700px) {
    padding: 100px 0 50px;
}
`;

const HiddenH1 = styled.h1`
position: absolute;
top: -100vh;
`;

class Contact extends React.Component {
    

    render() {

        if (this.props.data != undefined){
            let ContactContent = this.props.data.content.rendered;
            return (
                <DefaultContainer>
                    <Buffer>
                        <HiddenH1>Contact</HiddenH1>
                        <ContentContainer>{ReactHtmlParser(ContactContent)}</ContentContainer>
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
        data: state.pages['contact']
    }
}
  

export default connect(mapStateToProps)(Contact)
// export default Contact;