import React from 'react';
import Router from 'react-router';
import { ClassmereNavbar } from './components/Navbar';
import { HomePage } from './pages/Home';
import { SearchPage } from './pages/Search';
import { CoursePage } from './pages/Course';

const { Route, RouteHandler } = Router;

const App = React.createClass({
  render() {
    return (
      <div>
        <ClassmereNavbar/>
        <RouteHandler/>
      </div>
    );
  },
});

// URL Routes
const routes = (
  <Route handler={App}>
    <Route path="/" handler={HomePage} name="home"/>
    <Route path="search/:searchTerm" handler={SearchPage} name="search"/>
    <Route path="course/:abbr" handler={CoursePage} name="course"/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('root'));
});
