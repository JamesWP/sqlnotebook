var omap = require('../helpers/objItter.js').map;

var Reflux = require('reflux');

var TabStore = require('../stores/TabStore.js');
var WorkspaceStore = require('../stores/WorkspaceStore.js');

var Tab = require('./Tab.js');

var Binder = React.createClass({
  mixins: [Reflux.connect(TabStore,"tabs")],
  getInitialState: function(){
    //TODO: remove this
    return {selectedTab:'t1'};
  },
  handleChange: function(event){
    this.setState({value: event.target.value,selectedTab:null});
  },
  createTab: function(){
    var tabName = this.state.value;
    if(tabName.length>0){
      var tabKey = TabStore.createNewKey(tabName);
      TabStore.tabCreate(tabKey,tabName);
      this.setState({value:""});
    }
  },
  changeTab: function(tkey){
    this.setState({selectedTab:tkey});
  },
  openSearch: function(){
    WorkspaceStore.openSearch();
  },
  render: function(){
    var binder = this;
    var changeTab = function(tkey){
      return function(){binder.changeTab(tkey);};
    };
    var selTab;
    if(this.state.selectedTab)
      selTab = <Tab tabID={this.state.selectedTab} tab={this.state.tabs[this.state.selectedTab]}/>;
    else
      selTab = undefined;
    var tabs = omap(this.state.tabs,function(tkey,tab){
      return (<li onClick={changeTab(tkey)} key={tkey}>{tab.name}</li>);
    });
    return (this.props.open)?(
      <div className={"binder"}>
        <h1>Binder</h1>
        <ul>{tabs}</ul>
        <input type="text" value={this.state.value } onChange={this.handleChange}/>
        <br/>
        <button onClick={this.createTab}>Create new tab</button>
        {selTab}
        <br/>
        <button onClick={this.openSearch}>Search</button>
      </div>
    ):(<span/>);
  }
});

module.exports = Binder;
