
var React = require('react');

var Match = React.createClass({
  onClick: function(e){
    if(typeof this.props.onClick ==="function")
      this.props.onClick(e);
  },
  render: function(){
    var match = this.props.match;
    return (
      <li onClick={this.onClick}>
        <i>{match.pageKey}</i>
      <b>:{match.lineNumber}</b>
      <br/>
      {match.line}
      </li>
    );
  }
});

module.exports = Match;
