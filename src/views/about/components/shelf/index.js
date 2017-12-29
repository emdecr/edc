import React    from 'react';
// import axios from 'axios';
import Moment from 'react-moment';
import styled from 'styled-components';

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
@media (min-width: 700px) {
    width: 22%;

    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
        margin-top: 2%;
    }

}
`;

const Image = styled.img`
display: block;
width: auto;
height: 200px;
margin: 20px 0;
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

const RightAlign = styled.div`
text-align: right;
`;

class PinShelf extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    // componentDidMount() {
    //     axios.get('https://api.pinterest.com/v1/boards/emdecr/edccom-shelf/pins/?access_token=AYiwWgzbi8ufU79rb9qi-8do2GOmFQQ1Oo_pWrFElLAXSeAv0gAAAAA&fields=id,url,link,note,image,created_at,metadata,attribution')
    //     .then((result)=> {
    //     //   console.log(result.data.data)
    //       if (result.data.data.length > 8) {
    //         let items = result.data.data.slice(0, 8)
    //         this.setState({
    //             shelf: items
    //           }); 
    //       } else {
    //         let items = result.data.data
    //         this.setState({
    //             shelf: items
    //           }); 
    //       }              
    //     })
    // }

    render() {
            
        return (
            <div>
                <h2>The Shelf</h2>
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
                <RightAlign><DefaultButton href="https://www.pinterest.ca/emdecr/the-shelf/" target="_blank">View more</DefaultButton></RightAlign>
            </div>
        );
    }
}

export default PinShelf;