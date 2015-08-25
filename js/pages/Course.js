import React from 'react';
import $ from 'jquery';

const CourseInfo = React.createClass({
  render: function renderCourseInfo() {
    return (
      <div className="courseInfo">
        <h3>
          {this.props.course.abbr} : {this.props.course.title}
        </h3>
        <p>
          {this.props.course.description}
        </p>
      </div>
    );
  },
});

const SectionRow = React.createClass({
  render: function renderSectionRow() {
    return (
      <tr>
        <td>{this.props.section.type}</td>
        <td>{this.props.section.term}</td>
        <td>{this.props.section.credits}</td>
        <td>{this.props.section.instructor}</td>
        <td>{this.props.section.startTime}</td>
      </tr>
    );
  },
});

const SectionTable = React.createClass({
  render: function renderSectionTable() {
    const sections = this.props.sections;
    const sectionRows = sections.map(function mapSections(section) {
      return <SectionRow key={section.crn} section={section}/>;
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
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
  },
});

export const CoursePage = React.createClass({
  getInitialState: function getCoursePageState() {
    return {course: {sections: []}};
  },
  componentDidMount: function coursePageDidMount() {
    this.loadCourseFromServer();
  },
  render: function renderCoursePage() {
    return (
      <div className="coursePage container">
        <CourseInfo course={this.state.course} />
        <SectionTable sections={this.state.course.sections} />
      </div>
    );
  },
  loadCourseFromServer: function loadCourse() {
    const abbr = this.props.params.abbr;
    $.ajax({
      url: `http://classmere.herokuapp.com/courses/${abbr}`,
      dataType: 'json',
      cache: false,
      success: (course) => {
        this.setState({course: course});
      }.bind(this),
    });
  },
});