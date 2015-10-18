var React = window.React = require('react'),
    ReactDOM = require('react-dom'),
    mountNode = document.getElementById("app");

// My components
var Binder = require('./ui/Binder.js'),
    Tab = require('./ui/Tab.js'),
    Workspace = require('./ui/Workspace.js');


// Initial config
var initial = require('./init.json');

var SqlNotebookApp = React.createClass({
  getInitialState: function() {
    return initial;
  },
  render: function() {
    return (
      <div className={"container"}>
        <Binder selectedTab={this.state.selectedTab} tabs={this.state.tabs}/>
        <Tab tab={this.state.tabs[this.state.selectedTab]}/>
        <Workspace workspace={this.state.workspace}/>
      </div>
    );
  }
});


ReactDOM.render(<SqlNotebookApp />, mountNode);
