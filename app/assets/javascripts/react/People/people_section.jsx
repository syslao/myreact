var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
var PeopleSection = React.createClass({
  // displayName: 'PeopleSection',

  getInitialState() {
      return {
          didFetchData: false,
          people: [],
          meta:{
            total_pages: 0,
            current_page: 1,
            total_count: 0
          },
          fetchData:{
            search: '',
            page: 1
          }
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

    var card;
    if (this.state.people.length > 0) {
      card = card
    } else if (this.state.didFetchData) {
      card = noDataNode
    }



        return (

          <div>
            <PeopleSearch onFormSubmit={this._handleOnSearchSubmit}/>
            <PaginatorSection totalPages={this.state.meta.total_pages} currentPage={this.state.meta.current_page} onPaginate={this._handleOnPaginate}/>
              <div className="cards-wrapper">
                <ReactCSSTransitionGroup transitionName="card" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {card}
                </ReactCSSTransitionGroup>
              </div>
          </div>
        );
      }

});

