import React    from 'react';
import { connect } from 'react-redux';
import styled   from 'styled-components';

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

class Projects extends React.Component {

    render() {
            
        return (
            <DefaultContainer>
                <Buffer>
                    <h1>Projects</h1>
                    <p>Coming soon.</p>
                </Buffer>
            </DefaultContainer>
        );
    }
}

const mapStateToProps = function(state){
    return {
        data: state.pages['projects']
    }
}
  

export default connect(mapStateToProps)(Projects)
// export default Projects;