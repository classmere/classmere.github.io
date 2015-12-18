import React from 'react';
import Router, { Link } from 'react-router';

const ClassmereSearchInput = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function searchPageInitialState() {
    return {
        text: '',
        quarterTerm: term
    };
  },
  render: function renderSearch() {
    return (
      <div className="form-group">
          <select
            value={this.state.quarterTerm}
            className="form-control"
            onChange={this.handleSelectOnChange}>
                <option value="all">Select your term...</option>
                <option value="F15">Fall 2015</option>
                <option value="W16">Winter 2016</option>
                <option value="Sp16">Spring 2016</option>
                <option value="Su16">Summer 2016</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Search classes..."
            value={this.state.text}
            onChange={this.handleOnChange}
            onKeyDown={this.handleKeyDown}
            />
      </div>
    );
  },
  handleSelectOnChange: function handleSelectChange(event){
    this.setState( { quarterTerm: event.target.value } );
  },
  handleOnChange: function handleKeyboardInput(event) {
    this.setState({ text: event.target.value });
  },
  handleKeyDown: function handleEnterPressed(event) {
    // when enter is pressed
    if (event.keyCode === 13) {
      this.transitionTo('search', {
        searchTerm: this.state.text,
        quarterTerm: this.state.quarterTerm });
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
