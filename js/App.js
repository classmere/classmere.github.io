var React = require('react');
var Router = require('react-router');
var CourseDetail = require('./CourseDetail').CoursePage;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Route.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>classmere</h1>
        <RouteHandler/>
      </div>
    );
  },
});

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='courseDetail' handler={CourseDetail} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
