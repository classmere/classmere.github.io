import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

// Each class section is a card.
// This is the Card builder function
const SearchCard = React.createClass({

  getDefaultProps: function searchCardDefaultProps() {
    return { result: {} };
  },
  render: function renderSearchCard() {
    const result = this.props.result;
    return (
      <div className="card">
        <div className="card-block">
          <Link to="course"
              params={
                abbr: encodeURI(result.subjectCode),
                title: result.title,
                description: result.description
              }
              className="card-title h4">
              {result.subjectCode}{result.courseNumber} - {result.title}
          </Link>
          <p className="card-text">{result.description}</p>
        </div>
      </div>
    );
  },
});

export const SearchPage = React.createClass({
  getInitialState: function searchPageInitialState() {
    return {searchResults: []};
  },
  componentDidMount: function searchPageDidMount() {
    const searchTerm = this.props.params.searchTerm;
    $.ajax({
      url: `http://api.classmere.com/search/courses/${searchTerm}`,
      dataType: 'json',
      cache: false,
      success: (results) => {
        this.setState({
          searchResults: results,
        });
      }.bind(this),
    });
  },
  render: function renderSearchPage() {
    const results = this.state.searchResults;
    const resultCards = results.map(function mapResults(result) {
      return <SearchCard key={result.abbr} result={result}/>;
    });
    return (
      <div className="container">
        <h3>Results: {this.state.searchResults.length}</h3>
        {resultCards}
      </div>
    );
  },
});
