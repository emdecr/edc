import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import App        from './components/app';
import Home       from './views/home/index.js';
import About      from './views/about/index.js';
// import Projects   from './views/projects/index.js';
// import Articles   from './views/articles/index.js';
import NotFound   from './views/not-found/index.js';

import reducers   from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route component={NotFound}/>
            <Redirect from="*" to="/" />
          </Switch>
      </div>
    </Router>
  </Provider>
  , document.querySelector('.container'));
