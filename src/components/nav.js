import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const DefaultNav = styled.nav`
padding: 0 32px;
`;

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
&:hover {
    border-bottom: 1px solid blue;
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
                       return <ListItem><NavItem to="/" key={item.id} exact={true} activeClassName={activeClassName}>{item.title}</NavItem></ListItem>
                    }else if(item.object_slug == 'records'){
                        return<ListItem><RegLink href={item.url} activeClassName={activeClassName} target="_blank">{item.title}</RegLink></ListItem>
                    }else{
                        return<ListItem><NavItem to={`/${item.object_slug}`} key={item.id} activeClassName={activeClassName}>{item.title}</NavItem></ListItem>
                    }}
                )}
                </List>
            </DefaultNav>
        );
    }
}
