import React        from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchProjects }    from '../../../actions'; 
// import DataStore    from './../../stores/DataStore.js';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import Loader               from '../../../components/loading';

const DefaultContainer = styled.div`
max-width: 960px;
margin: 0 auto;
padding: 0 24px;
@media (min-width: 700px) {
    padding: 32px;
}
@media (min-width: 1000px) {
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
@media (min-width: 1000px) {
    padding: 100px 0 50px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    >div:first-child {
        width: 60%;
        position: relative;
        img {
            width: auto;
            max-width: 100%;
            max-height: 1100px;
            display: block;
            margin: 0 auto;
        }
    }
    >div:last-child {
        width: 35%;
        position: relative;
        img {
            width: auto;
            max-width: 100%;
            max-height: 1100px;
            display: block;
            margin: 0 auto;
        }
    }
}
`;

const H1NoTopMargin = styled.h1`
margin-top: 0;
`;

class SingleProject extends React.Component {

    componentDidMount() {
        if (this.props.projects.length > 0) {
            return
        } else {
            this.props.fetchProjects();
        }
    }
    

    render() {
        let ProjectObject = _.mapKeys(this.props.projects, 'slug')
        let ProjectSlug = this.props.match.params.slug
        let single = ProjectObject[ProjectSlug]
        // console.log(Single)

        if (single != undefined) {
            return (
                <DefaultContainer>
                    <Buffer>
                        <div>
                            <H1NoTopMargin>{single.title.rendered}</H1NoTopMargin>
                            <ContentContainer>{ReactHtmlParser(single.content.rendered)}</ContentContainer>
                        </div>
                        <div>
                            {ReactHtmlParser(single.meta_box.edc_project_details_meta)}
                        </div>
                        
                    </Buffer>
                </DefaultContainer>
            )
        } else {
            return (
                <Loader/>
            )
        }

    }
}

const mapStateToProps = function(state){
    return {
        projects: state.projects
    }
} 

export default connect(mapStateToProps, { fetchProjects })(SingleProject)
// export default Contact;