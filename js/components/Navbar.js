import React from 'react';
import Router, { Link } from 'react-router';

const ClassmereSearchInput = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function searchPageInitialState() {
    return {text: ''};
  },
  render: function renderSearch() {
    return (
      <input
        type="text"
        className="form-control"
        placeholder="search classes..."
        value={this.state.text}
        onChange={this.handleOnChange}
        onKeyDown={this.handleKeyDown}
        />
    );
  },
  handleOnChange: function handleKeyboardInput(event) {
    this.setState({ text: event.target.value });
  },
  handleKeyDown: function handleEnterPressed(event) {
    if (event.keyCode === 13) {
      this.transitionTo('search', {searchTerm: this.state.text});
      this.setState({ text: '' });
    }
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
