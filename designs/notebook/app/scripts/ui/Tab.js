var React = window.React = require('react')
var Reflux = require('reflux');
var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');
var WorkspaceStore = require('../stores/WorkspaceStore.js');
// My helpers
var omap = require('../helpers/objItter.js').map;

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';

const MODE_NORMAL = 'normal';
const MODE_DELETE = 'delete';

var Tab = React.createClass({
    mixins: [Reflux.connect(PageStore,"pages")],
    getInitialState: function(){
      return {value:"", mode:MODE_NORMAL};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    createPage: function(format){
      var pageName = this.state.value;
      if(pageName.length>0){
        var pageKey = PageStore.createNewKey(pageName)
        var options = {format:format};
        PageStore.pageCreate(pageKey, pageName, options);
        TabStore.tabLinkPage(this.props.tabID,pageKey);
        this.setState({value:""});
      }
    },
    openPage: function(pkey){
      WorkspaceStore.openPage(pkey);
    },
    deletePage: function(pkey){
      PageStore.pageDelete(pkey);
    },
    openIndex: function(){
      WorkspaceStore.openIndexPage(this.props.tabID);
    },
    toggleMode: function(){
      this.setState({mode:this.state.mode==MODE_DELETE?MODE_NORMAL:MODE_DELETE});
    },
    render: function() {
        var t = this;
        var tab = this.props.tab;
        var spages = this.state.pages;
        var tid = this.props.tabID;
        var pages = omap(tab.pages, (pkey, bind) => {
          if(!bind)return undefined;
          var page = spages[pkey];
          if (!page) return null;
          let actions = this.state.mode==MODE_NORMAL?(null):(<DeleteIcon/>);
          let clickAction = this.state.mode==MODE_NORMAL?()=>this.openPage(pkey):()=>this.deletePage(pkey);
          return <ListItem key={pkey} primaryText={page.name} onClick={clickAction} rightIcon={actions}/>;
        });
        if(pages.length==0){
          pages = <ListItem value={-1} key={-1} primaryText={"No pages created"}/>;
        }
        return (
            <Paper>
              <p style={{padding:10}}>{tab.name}</p>
              <FlatButton onClick={this.toggleMode} label="edit" primary={this.state.mode==MODE_DELETE} icon={<FontIcon className="fa fa-edit"/>}/>
              <List>
                {pages}
              </List>
              <Paper style={{padding:10, margin:"0 10px"}}>
                <TextField hintText="Page Name" style={{width:"100%"}} value={this.state.value} onChange={this.handleChange}/>
                <FlatButton disabled={this.state.value.length< 1} onClick={()=>this.createPage("sql")} label="new code page" icon={<FontIcon className="fa fa-plus"/>}/>
                <FlatButton disabled={this.state.value.length< 1} onClick={()=>this.createPage("markdown")} label="new text page" icon={<FontIcon className="fa fa-plus"/>}/>
              </Paper>
              <br/>
              <FlatButton onClick={this.openIndex} label="view index" icon={<FontIcon className="fa fa-bookmark"/>}/>
            </Paper>
        );
    }
});

module.exports = Tab;
