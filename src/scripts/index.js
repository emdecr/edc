import React        from 'react';
import {render}     from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

// import Nav          from './components/hardnav.js';
import Home         from './pages/home/index.js';
import About        from './pages/about/index.js';
import Projects     from './pages/projects/index.js';
import Articles     from './pages/articles/index.js';
import NotFound     from './pages/not-found/index.js';

const Root = () => {
  return (
    <Router>
      <div>
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