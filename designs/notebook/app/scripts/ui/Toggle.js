var React = window.React = require('react');
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';
var Toggle = React.createClass({
  onToggle: function(){
    this.props.onToggle();
  },
  render:function(){
    var openClose =":";
    return (
      <Paper zDepth={3} className="toggle" style={{backgroundColor:Colors.greenA400,color:'white',padding:10}} onClick={this.onToggle}>{openClose}</Paper>
    );
  }
});


module.exports = Toggle;
