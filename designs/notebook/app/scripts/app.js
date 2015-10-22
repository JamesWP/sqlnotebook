var React = window.React = require('react'),
    ReactDOM = require('react-dom'),
    mountNode = document.getElementById("app");

// My components
var Binder = require('./ui/Binder.js'),
    Tab = require('./ui/Tab.js'),
    Workspace = require('./ui/Workspace.js');

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
  render: function() {
    return (
      <div className={"container"}>
        <Binder  selectedTab={this.state.selectedTab} tabs={this.state.tabs}/>
        <Tab tabID={this.state.selectedTab} tab={this.state.tabs[this.state.selectedTab]}/>
        <Workspace workspace={this.state.workspace}/>
      </div>
    );
  }
});


ReactDOM.render(<SqlNotebookApp />, mountNode);
