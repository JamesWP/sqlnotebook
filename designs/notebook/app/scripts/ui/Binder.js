var omap = require('../helpers/objItter.js').map;

// Controller
var SqlNotebookController = require('../controller/main.js');




var Binder = React.createClass({
  getInitialState: function(){
    return {value:''};
  },
  handleChange: function(event){
    this.setState({value: event.target.value});
  },
  createTab: function(){
    var tabName = this.state.value;
    if(tabName.length>0){
      SqlNotebookController.processMessage({
        type:SqlNotebookController.messageTypes.makeNewTab,
        tabName:tabName
      });
      this.setState(this.getInitialState());
    }
  },
  changeTab: function(tkey){
    SqlNotebookController.processMessage({
      type:SqlNotebookController.messageTypes.binderSelectTab,
      tabID:tkey
    });
  },
  render: function(){
    var binder = this;
    var changeTab = function(tkey){
      return function(){binder.changeTab(tkey);};
    };
    var tabs = omap(this.props.tabs,function(tkey,tab){
      return (<li onClick={changeTab(tkey)} key={tkey}>{tab.name}</li>);
    });
    return (
      <div className={"binder"}>
        <h1>Binder</h1>
        <ul>{tabs}</ul>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.createTab}>Create new tab</button>
      </div>
    );
  }
});

module.exports = Binder;
