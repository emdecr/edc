
import React        from 'react';
import {render}     from 'react-dom';
import App          from './base/App.js';
import Home         from './pages/home/index.js';
import views        from './base/views.js';

import {
  browserHistory,
  IndexRoute,
  Redirect,
  Route,
  Router
} from 'react-router';

import DataActions  from './actions/DataActions.js';

class AppInitializer {

  buildRoutes(data) {
          return data.pages.map((page, i) => {
              const component = views[page.slug];
              return (
                  <Route
                      getComponent={(nextState, cb) => {
                          require.ensure([], (require) => {
                              cb(null, require(component).default);
                          });
                      }}
                      key={ page.id }
                      path={`/${page.slug}`}
                  />                  
              );
          });
      }

      run() {
          DataActions.getPages((response)=>{
              render(
                  <Router history={browserHistory}>
                      <Route path="/" component={ App } >
                          <IndexRoute component={ Home } />

                          {this.buildRoutes(response)}
                      </Route>
                      <Redirect from="*" to="/" />
                  </Router>

                  , document.getElementById('app')
              );
          });
      }
  
}

new AppInitializer().run();