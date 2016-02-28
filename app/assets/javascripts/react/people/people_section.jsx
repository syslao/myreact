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

  _fetchPeople: function(data) {
    $.ajax({
      url: Routes.people_path(),
      dataType: 'json',
      data: data,
      success: this._fetchDataDone,
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

  _fetchDataDone: function(data, textStatus, jqXHR) {
    if (!this.isMounted()) {
      return false;
    }
    this.setState({
      didFetchData: true,
      people: data.people
    });
  },

    _handleOnSearchSubmit: function(search){
      this._fetchPeople({search: search})
    },

    render: function() {

    var card =  this.state.people.map(function(person) {
                return <PersonCard key={person.id} data={person}/>;
                })



    var noDataNode = <div className="warning">
                      <span className="fa-stack">
                        <i className="fa fa-meh-o fa-stack-2x"></i>
                      </span>
                      <h4>No people found...</h4>
                    </div>

    var loginButton;
    if (this.state.people.length > 0) {
      loginButton = card
    } else if (this.state.didFetchData) {
      loginButton = noDataNode
    }



        return (

          <div>
            <PeopleSearch onFormSubmit={this._handleOnSearchSubmit}/>
              <div className="cards-wrapper">
                <ReactCSSTransitionGroup transitionName="card" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {loginButton}
                </ReactCSSTransitionGroup>
              </div>
          </div>
        );
      }

});

