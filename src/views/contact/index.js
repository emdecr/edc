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

class Contact extends React.Component {

    render() {
        return (
            <DefaultContainer>
                <Buffer>
                    <h1>Contact</h1>
                </Buffer>
            </DefaultContainer>
        );
    }
}

const mapStateToProps = function(state){
    return {
        data: state.pages['contact']
    }
}
  

export default connect(mapStateToProps)(Contact)
// export default Contact;