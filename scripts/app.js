// jscs:disable
var CourseInfo = React.createClass({
  render: function() {
    return (
      <div className="courseInfo">
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
      sectionRows.push(<SectionRow section={section}/>);
    });
    return (
      <table className="courseInfo u-full-width">
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

var CoursePage = React.createClass({
  loadCourseFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(course) {
        this.setState({course: course});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
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
    console.log(this.state.course.sections);
    return (
      <div className="coursePage container">
        <CourseInfo course={this.state.course} />
        <SectionTable sections={this.state.course.sections} />
      </div>
    );
  },
});
React.render(
  <CoursePage url="https://classmere.herokuapp.com/courses/CS%20160" />,
  document.getElementById('content')
);
