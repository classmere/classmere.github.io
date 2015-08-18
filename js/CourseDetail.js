import React from 'react';
import $ from 'jquery';

var CourseInfo = React.createClass({
  render: function() {
    return (
      <div className='courseInfo'>
        <h2>
          {this.props.course.abbr} : {this.props.course.title}
        </h2>
        <p>
          {this.props.course.description}
        </p>
      </div>
    );
  }
});

var SectionRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.section.term}</td>
        <td>{this.props.section.credits}</td>
        <td>{this.props.section.instructor}</td>
        <td>{this.props.section.startTime}</td>
      </tr>
    );
  }
});

var SectionTable = React.createClass({
  render: function() {
    var sectionRows = [ ];
    this.props.sections.forEach(function(section) {
      sectionRows.push(<SectionRow key={section.crn} section={section}/>);
    });
    return (
      <table className='courseInfo u-full-width'>
        <thead>
          <tr>
            <th>Term</th>
            <th>Credits</th>
            <th>Instructor</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sectionRows}
        </tbody>
      </table>
    );
  }
});

export var CoursePage = React.createClass({
  loadCourseFromServer: function() {
    $.ajax({
      url: 'http://classmere.herokuapp.com/courses/CS%20161',
      dataType: 'json',
      cache: false,
      success: function(course) {
        this.setState({course: course});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err);
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {course: {sections: []}};
  },
  componentDidMount: function() {
    this.loadCourseFromServer();
  },
  render: function() {
    return (
      <div className='coursePage container'>
        <CourseInfo course={this.state.course} />
        <SectionTable sections={this.state.course.sections} />
      </div>
    );
  }
});

