var React = window.React = require('react'),
    Codemirror = require('react-codemirror');
var Links = require('./Links.js');
// Controller
var WorkspaceStore = require('../stores/WorkspaceStore.js');
var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');
var Execute = require('../controller/execute.js');

var DataGrid = require('react-datagrid')


import PageActionBar from './PageActionBar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';


var RNKEY = "ROWNOKEY";

const MODE_NORMAL = "NORMAL";
const MODE_LINKS = "LINKS";

function getPartData(table){
  var columns = table.Columns.map((c,i)=>{
    return {
      name: "" + i,
      title: c.Name?c.Name:"No Name",
      width: 100
    };
  });
  var rows = table.Rows.map((r,i)=>{
    let row = {};
    row[RNKEY] = i;
    for(var ci=0;ci<columns.length;ci++)
      row[ci] = r.Values[ci];
    return row;
  });
  return {columns: columns, rows: rows};
}

var Result = React.createClass({
    close: function() {
        WorkspaceStore.closePage(this.props.pageIndex);
    },
    getInitialState: function(){
      if(typeof(this.props.page.content)!=="undefined"){
        var content = this.props.page.content;
        var table = content.Parts[0];
        var parts = content.Parts.map((table)=>{return getPartData(table);});
        return {mode: MODE_NORMAL,parts: parts, saved: false, conTok: ''};
      }else if(typeof(this.props.page.result)){
        return {mode: MODE_NORMAL,parts: this.props.page.result, saved:true, conTok: ''};
      }else{
        throw "unknown result data";
      }
    },
    save: function(){
      var queryPage = PageStore.getInitialState()[this.props.page.resultOf];
      var queryPageTabs = TabStore.searchPage(this.props.page.resultOf);
      var pageName = (queryPage.name||"Query") + ' result';
      var pageKey = PageStore.createNewKey(pageName);
      PageStore.pageCreateResult(pageKey, pageName);
      PageStore.pageSave(pageKey,this.state.parts);
      PageStore.linkCreate(this.props.page.resultOf,pageKey, {
        // created from link
        type:"resultOf"
      });
      for(var i=0;i<queryPageTabs.length;i++)
        TabStore.tabLinkPage(queryPageTabs[i],pageKey);
      this.close();
      WorkspaceStore.openPage(pageKey);
    },
    showLinks: function(){
      this.setState({mode:MODE_LINKS});
    },
    closeLinks: function() {
      this.setState({mode:MODE_NORMAL});
    },
    refresh: function(pageKey){
      // load the latest version of the query saved.
      var query = PageStore.getInitialState()[pageKey].content;
      // connect if not connected.
      if(this.state.conTok.length < 1){
        Execute.newSession({}, (conTok) => {
            this.state.conTok = conTok;
            this.setState(this.state);
            this.refresh(pageKey);
        });
        return;
      }
      // execute the query again.
      let ex = {
        conTok: this.state.conTok, content: query
      };
      Execute.execute(ex, (result) => {
        WorkspaceStore.openResult(result, pageKey);
      });
    },
    render: function() {
        let tables = this.state.parts.map((p,i)=>{
          return <DataGrid key={i}
            idProperty={RNKEY}
            dataSource={p.rows}
            columns={p.columns}
            style={{height: 500}}
          />
        });
        var linksout = PageStore.getLinksFrom(this.props.pageKey);
        var linksin = PageStore.getLinksTo(this.props.pageKey);

        const resultLinks = linksin.filter(l=>l.attrs.type=='resultOf');
        const hasResultOf = resultLinks.length > 0 || this.props.page.resultOf.length > 0;
        var resultOfPageKey = null;
        if(hasResultOf){
            if(resultLinks.length > 0)
              resultOfPageKey = resultLinks[resultLinks.length-1].from;
            else {
              resultOfPageKey = this.props.page.resultOf;
            }
        }

        let menuItems = [];

        if(!this.state.saved)
          menuItems.push(<MenuItem key="connect" leftIcon={<FontIcon className="fa fa-save"/>} primaryText="save" onClick={this.save}/>);
        if(hasResultOf)
          menuItems.push(<MenuItem key="rerun" primaryText="rerun" onClick={()=>this.refresh(resultOfPageKey)}/>);

        return (
            <div className="page">
                <PageActionBar
                  title={"Result"}
                  onClose={this.close}
                >{menuItems}</PageActionBar>
                {this.state.mode==MODE_NORMAL?(
                  <div className="resultTable">
                    {tables}
                  </div>
                ):(
                  <div>
                      <Links pageKey={this.props.pageKey} in={linksin} out={linksout}/>
                      <button onClick={()=>{this.closeLinks();}}>close</button>
                  </div>
                )}
            </div>
        );
    }
});

module.exports = Result;
