var PeopleSection = React.createClass({
  // displayName: 'PeopleSection',

  getInitialState() {
      return {
          didFetchData: false,
          people: []
      };
  },

  componentDidMount: function() {
    this._fetchPeople();
  },

  _fetchPeople: function() {
    $.ajax({
      url: Routes.people_path(),
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          people: data,
          didFetchData: true});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
      </div>
    );
  }

})
