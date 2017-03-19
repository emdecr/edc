
import React        from 'react';
import {render}     from 'react-dom';
import App          from './components/App.js';
import Home         from './components/Home.js';
import About        from './components/About.js';
import views        from './components/views.js';

import {
  browserHistory,
  IndexRoute,
  Redirect,
  Route,
  Router
} from 'react-router';

import DataActions  from './actions/DataActions.js';

class AppInitializer {

  // buildRoutes(data) {
  //   return data.pages.map((page, i) => {
  //     return (
  //       <Route
  //           component={ Home }
  //           key={ page.id }
  //           path={`/${page.slug}`}
  //       />                  
  //     );
  //   });
  // }

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
      // render(
      //     <Router history={browserHistory}>
      //         <Route path="/" component={ App } >
      //             <IndexRoute component={ Home } />
      //         </Route>
      //         <Redirect from="*" to="/" />
      //     </Router>
      //     , document.getElementById('app')
      // );
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