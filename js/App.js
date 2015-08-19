import '../css/custom.css';
import '../css/main.scss';
import React from 'react';
import Router from 'react-router';
import { HomePage } from './pages/Home';
import { CoursePage } from './pages/Course';

const { Route, RouteHandler, Link } = Router;

var App = React.createClass({
  render() {
    return (
      <div>
        <h1><Link to='home'>Home Page</Link></h1>
        <RouteHandler/>
      </div>
    );
  }
});

// URL Routes
const routes = (
  <Route handler={App}>
    <Route path='/' handler={HomePage} name='home'/>
    <Route path='course/:abbr' handler={CoursePage} name='course'/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('root'));
});
