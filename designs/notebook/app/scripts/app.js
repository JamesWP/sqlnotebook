var React = window.React = require('react'),
    ReactDOM = require('react-dom'),
    mountNode = document.getElementById("app");

// My components
var Binder = require('./ui/Binder.js'),
    Tab = require('./ui/Tab.js'),
    Workspace = require('./ui/Workspace.js'),
    Toggle = require('./ui/Toggle.js');

// Controller
var SqlNotebookController = require('./controller/main.js');

var SqlNotebookApp = React.createClass({
  getInitialState: function() {
    return SqlNotebookController.getState();
  },
  componentDidMount: function(){
    var app = this;
    SqlNotebookController.registerListener(
      SqlNotebookController.messageTypes.stateChange,
      function(messageType){
        app.setState(SqlNotebookController.getState());
      });
  },
  onToggle:function(){
    SqlNotebookController.toggleSidebar();
  },
  render: function() {
    return (
      <div className={"container"}>
        <Binder open={this.state.open} selectedTab={this.state.selectedTab} tabs={this.state.tabs}/>
        <Tab open={this.state.open} tabID={this.state.selectedTab} tab={this.state.tabs[this.state.selectedTab]}/>
        <Toggle open={this.state.open} onToggle={this.onToggle}/>
        <Workspace workspace={this.state.workspace}/>
      </div>
    );
  }
});


ReactDOM.render(<SqlNotebookApp />, mountNode);
