import React    from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const List = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`;

const ItemLabel = styled.small`
opacity: 0.5;
`;

const ContentContainer = styled.div`
font-family: 'Roboto', sans-serif;
font-size: 1.2rem;
line-height: 1.7;
p {
    font-family: 'Roboto', sans-serif;
}
`;

class Github extends React.Component {

    render() {
            
        return (
            <div>
                <h3><a href="https://github.com/emdecr" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a> Github Event Feed</h3>
                <ContentContainer>
                    {ReactHtmlParser(this.props.data.meta_box.edc_about_github_copy)}
                </ContentContainer>
                <List>
                {this.props.github.map((event) =>
                    {
                        let newType = event.type.replace(/([A-Z])/g, ' $1').trim()
                        let type = newType.replace(" Event", "")
                        let repoURL = 'https://github.com/' + event.repo.name;
                        if (event.type == 'PushEvent'){
                            // console.log(event);
                            let branchArray = event.payload.ref.split("/");
                            let branch = branchArray[2];
                            let repoName = event.repo.name;
                            return <li key={event.id}><ItemLabel><Moment fromNow date={event.created_at} /> - {type}</ItemLabel><p>R: <a href={repoURL} target="_blank>">{repoName}</a>, B: {branch}, CM: <a href={'https://github.com/' + event.repo.name + '/commit/' + event.payload.commits[0].sha} target="_blank>">{event.payload.commits[0].message}</a></p></li>
                        }else if (event.type == 'WatchEvent'){
                            return <li key={event.id}><ItemLabel><Moment fromNow date={event.created_at} /> - {type}</ItemLabel><p><a href={repoURL} target="_blank>">{event.repo.name}</a></p></li>
                        }else{
                            return <li key={event.id}><ItemLabel><Moment fromNow date={event.created_at} /> - {type}</ItemLabel><p><a href={repoURL} target="_blank>">{event.repo.name}</a></p></li>
                        }
                    }
                )}
                </List>
            </div>
        );
    }
}

export default Github;