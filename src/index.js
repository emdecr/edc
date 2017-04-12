import React        from 'react';
import {render}     from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Home         from './pages/home/index.js';
import About        from './pages/about/index.js';
import Projects     from './pages/projects/index.js';
import Articles     from './pages/articles/index.js';
import NotFound     from './pages/not-found/index.js';

const Root = () => {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/articles">Articles</Link></li>
        </ul>

        <hr/>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/about" component={Articles}/>
            <Route component={NotFound}/>
            <Redirect from="*" to="/" />
          </Switch>
        </CSSTransitionGroup>
        
      </div>
    </Router>
  )
}

render(<Root/>, document.querySelector('#app'));