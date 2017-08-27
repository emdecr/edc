import React        from 'react';
// import DataStore    from './../../stores/DataStore.js';

class Nav extends React.Component {

    render() {
        return (
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/articles">Articles</Link></li>
            </ul>
        );
    }
}

export default Nav;