import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const DefaultNav = styled.nav`
padding: 0 32px;
@media (max-width: 400px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
    background: blue;
    left: 0;
}
`;

const List = styled.ul`
list-style-type: none;
float: right;
padding: 0;
@media (max-width: 400px) {
    float: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
}
`;


const ListItem = styled.li`
display: inline-block;
margin: 0 10px;
@media (max-width: 400px) {
    text-align: center;
    padding: 12px 0;
}
`;

const RegLink = styled.a`
text-decoration: none;
&:hover {
    border-bottom: 1px solid blue;
}
@media (max-width: 400px) {
    color: white !important;
    text-decoration: none;

    &:hover {
        border-bottom: 1px solid white;
    }

    &.${activeClassName} {
        color: white;
        border-bottom: 1px solid white;
    }
}
i {
    display: none;
    @media (max-width: 400px) {
        display: block;
        margin-bottom: 4px;
    }
}
`;

const activeClassName = 'nav-item-active'

const NavItem = styled(NavLink).attrs({
    activeClassName
    })`

    color: blue;
    text-decoration: none;

    &:hover {
        border-bottom: 1px solid blue;
    }

    &.${activeClassName} {
        color: blue;
        border-bottom: 1px solid blue;
    }

    @media (max-width: 400px) {
        color: white !important;
        text-decoration: none;
    
        &:hover {
            border-bottom: 1px solid white;
        }
    
        &.${activeClassName} {
            color: white;
            border-bottom: 1px solid white;
        }
    }

    i {
        display: none;
        @media (max-width: 400px) {
            display: block;
            margin-bottom: 4px;
        }
    }
    
`;


export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        };
    }

    componentDidMount() {
        axios.get('https://data.emilydelacruz.com/wp-json/wp-api-menus/v2/menus/2')
        .then((result)=> {
        //   console.log(result.data.items)
          this.setState({
            menuItems: result.data.items
          });               
        })
    }

    render() {
        return (
            <DefaultNav>
                <List>
                {this.state.menuItems.map((item) =>
                    {if (item.object_slug == 'home'){
                       return <ListItem><NavItem to="/" key={item.id} exact={true} activeClassName={activeClassName}>{ReactHtmlParser('<i class="'+item.attr+'" aria-hidden="true"></i>')}{item.title}</NavItem></ListItem>
                    }else if(item.object_slug == 'records'){
                        return<ListItem><RegLink href={item.url} activeClassName={activeClassName} target="_blank">{ReactHtmlParser('<i class="'+item.attr+'" aria-hidden="true"></i>')}{item.title}</RegLink></ListItem>
                    }else{
                        return<ListItem><NavItem to={`/${item.object_slug}`} key={item.id} activeClassName={activeClassName}>{ReactHtmlParser('<i class="'+item.attr+'" aria-hidden="true"></i>')}{item.title}</NavItem></ListItem>
                    }}
                )}
                </List>
            </DefaultNav>
        );
    }
}
