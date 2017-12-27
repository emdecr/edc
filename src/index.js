import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
// import { ThemeProvider } from 'styled-components';
// import { renderSync } from 'sass-extract';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-56305018-1'); //Unique Google Analytics tracking number

// import App        from './components/app';
import Nav        from './components/nav.js';
import Home       from './views/home/index.js';
import About      from './views/about/index.js';
import Projects   from './views/projects/index.js';
import NotFound   from './views/not-found/index.js';

// Extract our Sass variables into a JS object
// const theme = renderSync(
//   { file: './sass/variables.scss' },
//   { plugins: ['sass-extract-js'] }
// ).vars;

import reducers   from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

function fireTracking() {
  ReactGA.pageview(window.location.hash);
}

// https://data.emilydelacruz.com/wp-json/wp-api-menus/v2/menus/2

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <Router onUpdate={fireTracking}>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/projects" component={Projects}/>
            <Route component={NotFound}/>
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  </Provider>
  , document.querySelector('.container'));
