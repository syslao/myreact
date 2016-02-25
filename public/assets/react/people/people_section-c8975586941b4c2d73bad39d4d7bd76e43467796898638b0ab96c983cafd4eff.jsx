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
          people: data.people,
          didFetchData: true});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

  render: function() {
    return (
      <div className="cards-wrapper">
        <ReactCSSTransitionGroup transitionName="card">
          {this.state.people.map(function(person) {
             return <PersonCard key={person.id} data={person}/>;
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

});


var PersonCard = React.createClass({
  render: function() {
    return (
      <div className="male">
      <header>
        <div className="avatar-wrapper">
          &nbsp;
          <img className="avatar" src={this.props.data.picture} />
        </div>
        <div className="info-wrapper">
          <h4>{this.props.data.first_name} {this.props.data.last_name}</h4>
          <ul className="meta">
            <li><i className="fa fa-map-marker"></i> {this.props.data.location}</li>
            <li><i className="fa fa-birthday-cake"></i> {moment(this.props.data.birth_date).format('D MMM YYYY')}</li>
          </ul>
        </div>
      </header>
      <div className="card-body">
        <div className="headline">
          <p>{this.props.data.headline}</p>
        </div>
        <ul className="contact-info">
          <li><i className="fa fa-phone"></i> {this.props.data.phone_number}</li>
            <li><i className="fa fa-envelope"></i> {this.props.data.email}</li>
        </ul>
      </div>
    </div>
    );
  }
})

