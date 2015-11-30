var React = window.React = require('react');

var Toggle = React.createClass({
  onToggle: function(){
    this.props.onToggle();
  },
  render:function(){
    var openClose =(this.props.open)?"<":">";
    return (
      <div className="toggle" onClick={this.onToggle}>{openClose}</div>
    );
  }
});


module.exports = Toggle;
