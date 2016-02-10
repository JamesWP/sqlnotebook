var React = window.React = require('react'),
    Codemirror = require('react-codemirror');
// Controller
var WorkspaceStore = require('../stores/WorkspaceStore.js');
var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');
var Execute = require('../controller/execute.js');

var DataGrid = require('react-datagrid')


var RNKEY = "ROWNOKEY";

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
        return {parts: parts, saved: false};
      }else if(typeof(this.props.page.result)){
        return {parts: this.props.page.result, saved:true};
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
      for(var i=0;i<queryPageTabs.length;i++)
        TabStore.tabLinkPage(queryPageTabs[i],pageKey);
      this.close();
      WorkspaceStore.openPage(pageKey);
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
                        <button className="close" onClick={this.close}>X</button>
                    </b>
                    <div className="actions">
                        {!this.state.saved?<button onClick={this.save}>Save</button>:null}
                    </div>
                </div>
                <div className="resultTable">
                  {tables}
                </div>
            </li>
        );
    }
});

module.exports = Result;
