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
    // variables for readability
    const section = this.props.section;
    const meetingTimes = section.meetingTimes;
    const term = this.props.term;

    // if meeting times is more than once, map it
    var startTimes = meetingTimes.map( function mapStartTimes(MT){
        // if the section does nto have a meeting day, show blank
        var days = MT.days;
        if(days === "TBA"){
            return(
                <div key={days}></div>
            )
        // if the section does have a meeting day, print time pretty
        } else{
            var start = new Date(MT.startTime);
            var end = new Date(MT.endTime);
            var options = {hour: '2-digit', minute: '2-digit'};
            return(
                <div key={days+start+end}>
                    { days + " " + start.toLocaleTimeString('en-US', options) + " - " + end.toLocaleTimeString('en-US', options)}
                </div>
            )
        }
    });
    // location grabber for each section, grabs roomnumber +  building
    var getLocation = meetingTimes.map(function mapLocation(MT){
        var room = MT.roomNumber;
        var building = MT.buildingCode;
        // if class type is WWW room will be null, just show blank instead.
        if( room === null ){
            room = "";
            building = "";
        }
        return(
            <div>
                { room + " " + building }
            </div>
        )
    });

    // get enrollment and waitlist statuses
    // if null make 0 to prettify
    var enrolled = section.currentEnrollment;
    if(enrolled === null){ enrolled = 0; }
    var capacity = section.capacity;
    if(capacity === null){ capacity = 0; }
    var waitlist = section.waitlistCurrent;
    if(waitlist === null){ waitlist = 0; }
    var wlCapacity = section.waitlistCapacity;
    if(wlCapacity === null){ wlCapacity = 0; }

    // if the term matches the URL term, return the data otherwise return nothing
    if(term == this.props.section.term || term == "all"){
        return (
          <tr>
            <td>{this.props.section.term}</td>
            <td>{this.props.section.type}</td>
            <td>{this.props.section.crn}</td>
            <td>{getLocation}</td>
            <td>{startTimes}</td>
            <td>{this.props.section.instructor}</td>
            <td>{this.props.section.credits}</td>
            <td>{enrolled}/{capacity}</td>
            <td>{waitlist}/{wlCapacity}</td>
          </tr>
        );
    } else{
        return <tr></tr>;
    }
  },
});

const SectionTable = React.createClass({
  render: function renderSectionTable() {
    const sections = this.props.sections;
    const term = this.props.term;
    const sectionRows = sections.map(function mapSections(section) {
      return <SectionRow key={section.crn} term={term} section={section}/>;
    });

    return (
      <table className="table table-bordered table-hover table-condensed">
        <thead>
          <tr>
            <th>Term</th>
            <th>Type</th>
            <th>CRN</th>
            <th>Location</th>
            <th>Time</th>
            <th>Instructor</th>
            <th>Credits</th>
            <th>Enrolled</th>
            <th>Waitlist</th>
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
        <SectionTable term={this.props.params.quarterTerm} sections={this.state.course.sections} />
      </div>
    );
  },
  //
  // This API call does not work therefore it does not load the page properly
  //
  loadCourseFromServer: function loadCourse() {
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
