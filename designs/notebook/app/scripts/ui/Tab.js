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


var Tab = React.createClass({
    mixins: [Reflux.connect(PageStore,"pages")],
    getInitialState: function(){
      return {value:""};
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
    render: function() {
        var t = this;
        var tab = this.props.tab;
        var spages = this.state.pages;
        var tid = this.props.tabID;
        var pages = omap(tab.pages, (pkey, bind) => {
          if(!bind)return undefined;
          var page = spages[pkey];
          if (!page) return null;
          let actions = (
            <span>
              <button onClick={()=>{this.deletePage(pkey)}}>delete</button>
            </span>);
          return <ListItem key={pkey} primaryText={page.name} onClick={()=>{this.openPage(pkey)}} rightIcon={actions}/>;
        });
        return (
            <Paper style={{padding:5,margin:5}}>
                <h1>{tab.name}</h1>
                <List>
                  {pages}
                </List>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <br/>
                <button onClick={()=>this.createPage("sql")}>Create new code page</button>
                <button onClick={()=>this.createPage("markdown")}>Create new text page</button>
                <button onClick={this.openIndex}>View index</button>
            </Paper>
        );
    }
});

module.exports = Tab;
