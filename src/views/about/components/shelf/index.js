import React    from 'react';
// import axios from 'axios';
import Moment from 'react-moment';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

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

const ListItem = styled.li`
margin-bottom: 40px;
@media (max-width: 400px) {
    text-align: center;
}
@media (min-width: 700px) {
    margin-bottom: 0;
    width: 20.5%;

    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
        margin-top: 32px;
    }

}
`;

const Image = styled.img`
display: block;
width: auto;
max-width: 100%;
max-height: 200px;
margin: 20px 0;
@media (max-width: 400px) {
    margin: 0 auto;
}
`;

const TimeStamp = styled.span`
display: block;
font-style: italic;
font-size: 0.8rem;
opacity: 0.5;
`;

const DefaultButton = styled.a`
display: inline-block;
border: 1px solid blue;
color: blue;
padding: 8px 32px;
margin: 40px 0 0;
&:hover {
    background: blue;
    color: white;
    border: 1px solid blue;
}
`;

const CenterAlign = styled.div`
text-align: center;
`;

const RightAlign = styled.div`
text-align: right;
@media (max-width: 400px) {
    text-align: center;
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

const SmallContainer = styled.div`
max-width: 720px;
`;

class PinShelf extends React.Component {

    render() {
        // console.log(this.props.data);
        return (
            <div>
                <SmallContainer>
                    <h3>The Shelf</h3>
                    <ContentContainer>
                        {ReactHtmlParser(this.props.data.meta_box.edc_about_shelf_copy)}
                    </ContentContainer>
                </SmallContainer>
                <List>
                {this.props.shelf.map((item) =>
                    {
                        let imgURL = item.image.original.url
                        if (item.id !== ''){
                            return <ListItem key={item.id}><a href={item.link} target="_blank"><Image src={imgURL} alt={item.note}/></a><p>{item.note}</p><TimeStamp>Added: <a href={item.url} target="_blank"><Moment fromNow subtract={{ hours: 5 }} date={item.created_at} /></a></TimeStamp></ListItem>
                        }else{
                            return <ListItem key={item.id}><Moment fromNow date={item.created_at} />Hi</ListItem>
                        }
                    }
                )}
                </List>
                <CenterAlign><DefaultButton href="https://www.pinterest.ca/emdecr/the-shelf/" target="_blank">View more</DefaultButton></CenterAlign>
            </div>
        );
    }
}

export default PinShelf;