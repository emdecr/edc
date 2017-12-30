import React    from 'react';
import { connect } from 'react-redux';
import styled   from 'styled-components';
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

class Projects extends React.Component {

    render() {

        if (this.props.data != undefined){
            let ProjectsContent = this.props.data.content.rendered;
            return (
                <DefaultContainer>
                    <Buffer>
                        <h1>Projects</h1>
                        <ContentContainer>{ReactHtmlParser(ProjectsContent)}</ContentContainer>
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
        data: state.pages['projects']
    }
}
  

export default connect(mapStateToProps)(Projects)
// export default Projects;