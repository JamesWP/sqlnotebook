var React = window.React = require('react'),
    mountNode = document.getElementById("app");

// My components
var Binder = require('./ui/Binder.js'),
    Tab = require('./ui/Tab.js'),
    Workspace = require('./ui/Workspace.js');

// My helpers
var flex = require('./helpers/flex.js');

// Initial config
var initial = require('./init.json');

var SqlNotebookApp = React.createClass({
  getInitialState: function() {
    return initial;
  },
  render: function() {
    return (
      <div style={flex.horiz}>
        <Binder selectedTab={this.state.selectedTab} tabs={this.state.tabs}/>
        <Tab tab={this.state.tabs[this.state.selectedTab]}/>
        <Workspace workspace={this.state.workspace}/>
      </div>
    );
  }
});


React.render(<SqlNotebookApp />, mountNode);
