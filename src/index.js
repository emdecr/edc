import React                              from 'react';
import ReactDOM                           from 'react-dom';
import { Provider }                       from 'react-redux';
import { createStore, applyMiddleware }   from 'redux';
import promiseMiddleware                  from 'redux-promise-middleware';
import { BrowserRouter as Router }        from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import { ThemeProvider }               from 'styled-components';
// import { renderSync }                  from 'sass-extract';
import ReactGA                            from 'react-ga';
ReactGA.initialize('UA-56305018-1'); //Unique Google Analytics tracking number

import App          from './components/app.js';
import ScrollToTop  from './components/ScrollToTop.js';

// Extract our Sass variables into a JS object
// const theme = renderSync(
//   { file: './sass/variables.scss' },
//   { plugins: ['sass-extract-js'] }
// ).vars;

import reducers   from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore);

function fireTracking() {
  ReactGA.pageview(window.location.hash);
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <Router onUpdate={fireTracking}>
        <ScrollToTop>
          <App/>
        </ScrollToTop>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
