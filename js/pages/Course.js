import React from 'react';
import $ from 'jquery';

const CourseInfo = React.createClass({
  render: function renderCourseInfo() {
    return (
      <div className="courseInfo">
        <h3>
          {this.props.course.subjectCode} {this.props.course.courseNumber} : {this.props.course.title}
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
        <td>
            {this.props.section.meetingTimes[0].startTime}
        </td>
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
  //
  // This API call does not work therefore it does not load the page properly
  //
  loadCourseFromServer: function loadCourse() {
    //const abbr = this.props.params.abbr;
    const subjectCode = this.props.params.subjectCode;
    const courseNumber = this.props.params.courseNumber;
    $.ajax({
      url: `http://api.classmere.com/courses/${subjectCode}/${courseNumber}`,
      dataType: 'json',
      cache: false,
      success: (course) => {
        this.setState({course: course});
      }.bind(this),
    });
  },
});
