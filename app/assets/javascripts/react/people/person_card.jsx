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
