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
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

let SelectableList = SelectableContainerEnhance(List);


const style = {
  page:{
    width:'auto'
  }
};

var Binder = React.createClass({
  mixins: [Reflux.connect(TabStore,"tabs")],
  getInitialState: function(){
    //TODO: remove this
    return {selectedTab:'t1',value:''};
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
    if(tkey==-1) return;
    this.setState({selectedTab:tkey});
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
    if(tabs.length==0){
      tabs = <ListItem value={-1} key={-1} primaryText={"No tabs created"}/>;
    }
    return (this.props.open)?(
      <Paper zDepth={0} style={style.page}>
        <SelectableList valueLink={{value: this.state.selectedTab, requestChange: this.changeTab}}>
          {tabs}
        </SelectableList>
        <Paper style={{padding:10, margin:10}}>
          <TextField hintText="Tab Name" value={this.state.value} onChange={this.handleChange}/>
          <FlatButton disabled={this.state.value.length < 1} icon={<FontIcon className="fa fa-plus"/>} label="New Tab" onClick={this.createTab} />
        </Paper>
        <Paper style={{padding:10}}>
        {(this.state.selectedTab)?(
            <Tab tabID={this.state.selectedTab} tab={this.state.tabs[this.state.selectedTab]}/>
        ):null}
        </Paper>
        <br/>
      </Paper>
    ):(<span/>);
  }
});

module.exports = Binder;
