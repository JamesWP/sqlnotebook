var React = window.React = require('react'),
    Codemirror = require('react-codemirror');
var Links = require('./Links.js');
// Controller
var WorkspaceStore = require('../stores/WorkspaceStore.js');
var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');
var Execute = require('../controller/execute.js');

var DataGrid = require('react-datagrid')


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
        return {mode: MODE_NORMAL,parts: parts, saved: false};
      }else if(typeof(this.props.page.result)){
        return {mode: MODE_NORMAL,parts: this.props.page.result, saved:true};
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
    },    showLinks: function(){
          this.setState({mode:MODE_LINKS});
        },
        closeLinks: function() {
          this.setState({mode:MODE_NORMAL});
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
        return (
            <li className="page">
                <div className="head">
                    <b> Result
                        <small>
                            {this.props.pageIndex}</small>
                        <small onClick={()=>this.showLinks()}> links:{linksout.length + linksin.length}</small>
                        <button className="close" onClick={this.close}>X</button>
                    </b>
                    <div className="actions">
                        {!this.state.saved?<button onClick={this.save}>Save</button>:null}
                    </div>
                </div>
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

            </li>
        );
    }
});

module.exports = Result;
