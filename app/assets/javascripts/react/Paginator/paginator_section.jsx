PaginatorSection = React.createClass({

  _handleOnClick: function(pageNumber){
    this.props.onPaginate(pageNumber)
  },

  render: function(){
    return(
      <div></div>
      )
  }
});
