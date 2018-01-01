import React    from 'react';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import ProjectItem  from './project-item';

const List = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
@media (min-width: 700px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
`;

class ProjectList extends React.Component {

    render() {
        // console.log(this.props.data);
        return (
            <div>
                <List>
                {this.props.projects.map((item) =>
                    {
                        return <ProjectItem key={item.id} info={item} projectid={item.id} slug={item.slug} />
                    }
                )}
                </List>
            </div>
        );
    }
}

export default ProjectList;