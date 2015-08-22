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
    let sectionRows = [ ];
    this.props.sections.forEach((section) => {
      sectionRows.push(<SectionRow key={section.crn} section={section}/>);
    });
    return (
      <Table>
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
      </Table>
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
    $.ajax({
      url: `http://classmere.herokuapp.com/courses/${this.props.params.abbr}`,
      dataType: 'json',
      cache: false,
      success: (course) => {
        this.setState({course: course});
      }.bind(this),
      error: (xhr, status, err) => {
        console.error(err);
      }.bind(this),
    });
  },
});
