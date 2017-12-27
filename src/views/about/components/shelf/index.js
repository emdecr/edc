import React    from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import styled from 'styled-components';

const List = styled.ul`
list-style-type: none;
@media (min-width: 700px) {
    display: flex;
    flex-wrap: wrap;
}
`;

const ListItem = styled.li`
@media (min-width: 700px) {
    width: 25%;
}
`;


const Image = styled.img`
display: block;
width: auto;
height: 200px;
margin: 20px 0;
`;

class PinShelf extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shelf: []
        };
    }

    componentWillMount() {
        axios.get('https://api.pinterest.com/v1/boards/emdecr/edccom-shelf/pins/?access_token=AYiwWgzbi8ufU79rb9qi-8do2GOmFQQ1Oo_pWrFElLAXSeAv0gAAAAA&fields=id,url,link,note,image,created_at,metadata,attribution')
        .then((result)=> {
        //   const thisData = result;
          console.log(result.data.data)
          this.setState({
            shelf: result.data.data
          });               
        })
    }

    render() {
            
        return (
            <div>
                <h2>Shelf</h2>
                <List>
                {this.state.shelf.map((item) =>
                    {
                        let imgURL = item.image.original.url
                        if (item.id !== ''){
                            return <ListItem key={item.id}><small>Added: <a href={item.url} target="_blank"><Moment fromNow subtract={{ hours: 5 }} date={item.created_at} /></a></small><a href={item.link} target="_blank"><Image src={imgURL} alt={item.note}/></a><p>{item.note}</p></ListItem>
                        }else{
                            return <ListItem key={item.id}><Moment fromNow date={item.created_at} />Hi</ListItem>
                        }
                    }
                )}
                </List>
            </div>
        );
    }
}

export default PinShelf;