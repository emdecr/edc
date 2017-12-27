import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.ul`
list-style-type: none;
float: right;
`;

const ListItem = styled.li`
display: inline-block;
margin: 0 10px;
`;

const RegLink = styled.a`
text-decoration: none;
`;

const activeClassName = 'nav-item-active'

const NavItem = styled(NavLink).attrs({
    activeClassName
    })`

    color: blue;
    text-decoration: none;

    &.${activeClassName} {
        color: black;
    }
`;


export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        };
    }

    componentWillMount() {
        axios.get('https://data.emilydelacruz.com/wp-json/wp-api-menus/v2/menus/2')
        .then((result)=> {
        //   const thisData = result;
          console.log(result.data.items)
          this.setState({
            menuItems: result.data.items
          });               
        })
    }

    render() {
        return (
            <nav>
                <List>
                {this.state.menuItems.map((item) =>
                    {if (item.object_slug == 'home'){
                       return <ListItem><NavItem to="/" key={item.id} activeClassName={activeClassName}>{item.title}</NavItem></ListItem>
                    }else if(item.object_slug == 'records'){
                        return<ListItem><RegLink href={item.url} activeClassName={activeClassName} target="_blank">{item.title}</RegLink></ListItem>
                    }else{
                        return<ListItem><NavItem to={`/${item.object_slug}`} key={item.id} activeClassName={activeClassName}>{item.title}</NavItem></ListItem>
                    }}
                )}
                </List>
            </nav>
        );
    }
}
