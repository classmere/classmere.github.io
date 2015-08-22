import React from 'react';
import { Link } from 'react-router';

const ClassmereSearchInput = React.createClass({
  render: function renderSearch() {
    return (
      <input
        type="text"
        className="form-control"
        placeholder="search classes..."/>
    );
  },
});

export const ClassmereNavbar = React.createClass({
  render: function renderNavbar() {
    return (
      <nav className="navbar navbar-light">
        <Link to="home" className="navbar-brand">classmere</Link>
        <form className="form-inline navbar-form pull-right">
          <ClassmereSearchInput/>
        </form>
      </nav>
    );
  },
});
