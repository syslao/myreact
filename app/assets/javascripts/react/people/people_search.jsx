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
