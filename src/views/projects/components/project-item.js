import React    from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const ListItem = styled.li`
margin-bottom: 40px;
position: relative;
@media (min-width: 700px) {
    margin-bottom: 0;
    width: 45%;
}
`;

const Description = styled.div`

`;

const MainImage = styled.img`
max-width: 100%;
height: auto;
`;

const ImgLink = styled(Link)`
    &:hover {
        border-bottom: none;
    }
`;

class ProjectItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: this.props.info.meta_box.edc_project_details_img 
        };
    }

    changeImage() {
        console.log('hover')
        this.setState({
            image: this.props.info._embedded['wp:featuredmedia'][0].source_url
        });
      }
     
    resetImage() {
        console.log('reset')
        this.setState({
            image: this.props.info.meta_box.edc_project_details_img 
        });
    }

    render() {
        let img = this.props.info._embedded['wp:featuredmedia'][0].source_url;
        let hover = this.props.info.meta_box.edc_project_details_img;
        console.log(this.props.info, img);
        if (img != '' && img != undefined ) {
            return (
                <ListItem>
                    <ImgLink to={`/projects/${this.props.slug}`}>
                        <MainImage
                            src={this.state.image}
                            onMouseEnter={this.changeImage.bind(this)} 
                            onMouseLeave={this.resetImage.bind(this)}
                        />
                    </ImgLink>
                    <h3><Link to={`/projects/${this.props.slug}`}>{this.props.info.meta_box.edc_banner_heading}</Link></h3>
                    <Description>{ReactHtmlParser(this.props.info.meta_box.edc_banner_subheading)}</Description>
                </ListItem>
            );
        } else {
            return (
                <ListItem>
                    <img src="http://via.placeholder.com/450x300" />
                    <h3><Link to={`/projects/${this.props.slug}`}>{this.props.info.meta_box.edc_banner_heading}</Link></h3>
                    <Description>{ReactHtmlParser(this.props.info.meta_box.edc_banner_subheading)}</Description>
                </ListItem>
            );
        }
        
    }
}

export default ProjectItem;