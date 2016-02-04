var React = window.React = require('react'),
    ReactDOM = require('react-dom'),
    mountNode = document.getElementById("app");

// My components
var Binder = require('./ui/Binder.js'),
    Workspace = require('./ui/Workspace.js'),
    Toggle = require('./ui/Toggle.js');

var SqlNotebookApp = React.createClass({
  getInitialState:()=>{return {open:true};},
  onToggle:function(){
    this.setState({open: !this.state.open});
  },
  render: function() {
    return (
      <div className={"container"}>
        <Binder open={this.state.open}/>
        <Toggle open={this.state.open} onToggle={this.onToggle}/>
        <Workspace/>
      </div>
    );
  }
});


ReactDOM.render(<SqlNotebookApp />, mountNode);
