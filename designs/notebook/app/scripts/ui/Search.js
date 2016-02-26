var React = window.React = require('react');
var Reflux = require('reflux');
// Controller
var WorkspaceStore = require('../stores/WorkspaceStore.js');
var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');

import PageActionBar from './PageActionBar.js';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';


var Match = require('./Match.js');

var Search = React.createClass({
    mixins: [Reflux.listenTo(PageStore,"onPageStoreUpdate")],
    onPageStoreUpdate: function(store){
        if(this.state.search.length>0){
          this.search(this.state.search);
        }
    },
    close: function() {
        WorkspaceStore.closePage(this.props.pageIndex);
    },
    getInitialState: function(){
      if(typeof(this.props.page)!=="undefined" && typeof(this.props.page.term)!=="undefined")
        setTimeout(()=>this.search(this.props.page.term),10);

      return {saved:false,search:'',matches: null};
    },
    save: function(){
      //TODO: implement
      this.setState({saved:true});
    },
    searchChange: function(event){
      var value = event.target.value;
      this.search(value);
      this.setState({saved:false});
    },
    search: function(term){
      PageStore.search(term, matches=>{
        this.setState({matches:matches});
      });
      this.setState({search:term});
    },
    openPage: function(pageKey){
      WorkspaceStore.openPage(pageKey);
    },
    render: function() {
      var matches = this.state.matches;

      const hasMatches = matches!==null;
      const numMatches = hasMatches?matches.length:0;

      return (
          <div className="page">
            <PageActionBar
              title={("Search " + (this.state.saved?(""):"*"))}
              onClose={this.close}>
              <MenuItem leftIcon={<FontIcon className="fa fa-save"/>} primaryText="Save" onClick={this.save}/>
            </PageActionBar>
            <div className="searchResults">
              <TextField hintText="Search term" style={{width:"100%",margin:10}} onChange={this.searchChange} value={this.state.search}/>
              <Paper style={{padding:10}}>
                <b style={{float:"right"}}>{hasMatches?"Matches: " + numMatches:null}</b>
                Search results
                <br/>
                <List>
                {hasMatches?matches.map((match,i)=>{
                  return (
                    <ListItem key={i} onClick={()=>{this.openPage(match.pageKey)}}>
                      <Match match={match} term={this.state.search}/>
                    </ListItem>
                  );
                }):null}
                </List>
              </Paper>
            </div>
          </div>
      );
    }
});

module.exports = Search;
