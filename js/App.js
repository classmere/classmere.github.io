import React from 'react';
import Router from 'react-router';
import { CoursePage } from './CourseDetail';

const Route = Router.Route;
const RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render() {
    return (
      <div>
        <h1>classmere</h1>
        <RouteHandler/>
      </div>
    );
  }
});

const routes = (
  <Route handler={App}>
    <Route path='course' handler={CoursePage}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('root'));
})
