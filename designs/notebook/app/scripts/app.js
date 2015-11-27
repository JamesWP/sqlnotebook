var React = window.React = require('react'),
    ReactDOM = require('react-dom'),
    mountNode = document.getElementById("app");

// My components
var Binder = require('./ui/Binder.js'),
    Tab = require('./ui/Tab.js'),
    Workspace = require('./ui/Workspace.js');

// Controller
var SqlNotebookController = require('./controller/main.js');


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

var SqlNotebookApp = React.createClass({
  getInitialState: function() {
    var st = SqlNotebookController.getState();
    st.open = true;
    return st;
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
    this.setState({"open":!this.state.open});
  },
  render: function() {
    var m = (this.state.open)?(
        <Binder selectedTab={this.state.selectedTab} tabs={this.state.tabs}/>
    ):(
      <div></div>
    );
    var n = (this.state.open)?(
      <Tab tabID={this.state.selectedTab} tab={this.state.tabs[this.state.selectedTab]}/>
    ):(
      <div></div>
    );
    return (
      <div className={"container"}>
        {m}
        {n}
        <Toggle open={this.state.open} onToggle={this.onToggle}/>
        <Workspace workspace={this.state.workspace}/>
      </div>
    );
  }
});


ReactDOM.render(<SqlNotebookApp />, mountNode);
