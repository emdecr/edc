import React from 'react';
import Nav from './Nav.js';
import '../sass/app.scss';

export default class App extends React.Component {
	
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                {this.props.children}
            </div>
        );
    }
}