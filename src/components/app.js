import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fetchPages } from '../actions'; 
// import { ThemeProvider } from 'styled-components';
// import { renderSync } from 'sass-extract';

import Nav        from './nav.js';
import Footer     from './footer.js';
import Home       from '../views/home/index.js';
import About      from '../views/about/index.js';
import Projects   from '../views/projects/index.js';
import Contact    from '../views/contact/index.js';
import NotFound   from '../views/not-found/index.js';

// Extract our Sass variables into a JS object
// const theme = renderSync(
//   { file: './sass/variables.scss' },
//   { plugins: ['sass-extract-js'] }
// ).vars;

const timeout = { enter: 300, exit: 200 }

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     pages: []
  //   };
  // }

  // componentDidMount() {
  //   axios.get('https://data.emilydelacruz.com/wp-json/wp/v2/pages?_embed')
  //   .then((result)=> {
  //     this.setState({
  //       pages: result.data
  //     });               
  //   })
  // }

  componentDidMount() {
    this.props.fetchPages();
  }

  render() {
    return (
      <div>
        <Nav/>
        <TransitionGroup className="page-main">
          <CSSTransition timeout={timeout} classNames="fade" appear>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/projects" component={Projects}/>
                <Route path="/contact" component={Contact}/>
                <Route component={NotFound}/>
                <Redirect from="*" to="/" />
              </Switch>
              <Footer/>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('app', state);
  return { pages: state.pages };
}

// export default connect(mapStateToProps, { fetchPages })(App);
export default withRouter(connect(mapStateToProps, { fetchPages })(App));
