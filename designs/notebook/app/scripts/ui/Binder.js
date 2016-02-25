var omap = require('../helpers/objItter.js').map;

var Reflux = require('reflux');

var TabStore = require('../stores/TabStore.js');
var WorkspaceStore = require('../stores/WorkspaceStore.js');

var Tab = require('./Tab.js');

import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

let SelectableList = SelectableContainerEnhance(List);


const style = {
  page:{
    padding:10,
    width:'auto'
  }
};

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
  changeTab: function(e, tkey){
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
    var tabs = omap(this.state.tabs,function(tkey,tab){
      return (<ListItem value={tkey} key={tkey} primaryText={tab.name}/>);
    });
    return (this.props.open)?(
      <Paper zDepth={0} style={style.page}>
        <h1>Binder</h1>

        <SelectableList valueLink={{value: this.state.selectedTab, requestChange: this.changeTab}}>
          {tabs}
        </SelectableList>
        <TextField hintText="Page Name" value={this.state.value} onChange={this.handleChange}/>
        <FlatButton iconClassName="fa fa-plus-circle" label="New Tab" onClick={this.createTab} />
        {(this.state.selectedTab)?
          <Tab tabID={this.state.selectedTab} tab={this.state.tabs[this.state.selectedTab]}/>:null}
        <br/>
        <RaisedButton label="Search" onClick={this.openSearch}/>
      </Paper>
    ):(<span/>);
  }
});

module.exports = Binder;
