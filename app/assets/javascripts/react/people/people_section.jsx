var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
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

    _handleOnSearchSubmit: function(search){
      this._fetchPeople({search: search})
    },

  render: function() {
    return (

      <div>
        <PeopleSearch onFormSubmit={this._handleOnSearchSubmit}/>
          <div className="cards-wrapper">
            <ReactCSSTransitionGroup transitionName="card" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {this.state.people.map(function(person) {
                 return <PersonCard key={person.id} data={person}/>;
              })}
            </ReactCSSTransitionGroup>
          </div>
      </div>
    );
  }

});


var PersonCard = React.createClass({
  render: function() {
    var CardClasses = classNames({ 'card'  : true, 
                      'female': this.props.data.gender === 'female',
                      'male'  : this.props.data.gender === 'male'
                      });
    return (
      <div className={CardClasses}>
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
});

var PeopleSearch = React.createClass({
  _handleOnSubmit: function(e) {
    e.preventDefault();
    var searchValue = this.refs.search.getDOMNode().value.trim()
    this.props.onFormSubmit(searchValue)
  },

 
  render: function() {
    return (
      <div className="filter-wrapper">
        <div className="form-wrapper">
          <form onSubmit={this._handleOnSubmit}>
            <input ref="search" placeholder="Search people..." type="search"/>
          </form>
        </div>
      </div>
    );
  }
});

