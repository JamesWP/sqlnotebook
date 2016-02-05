var React = window.React = require('react'),
    Codemirror = require('react-codemirror');
// Controller
var WorkspaceStore = require('../stores/WorkspaceStore.js');
var Execute = require('../controller/execute.js');

var DataGrid = require('react-datagrid')


var RNKEY = "ROWNOKEY";

var Result = React.createClass({
    close: function() {
        WorkspaceStore.closePage(this.props.pageIndex);
    },
    getInitialState: function(){
      var content = this.props.page.content;
      var table = content.Parts[0];
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
    },
    render: function() {
        return (
            <li className="page">
                <div className="head">
                    <b> Result
                        <small>
                            {this.props.pageIndex}</small>
                        <button className="close" onClick={this.close}>X</button>
                    </b>
                </div>
                <div className="resultTable">
                  <DataGrid
              			idProperty={RNKEY}
              			dataSource={this.state.rows}
              			columns={this.state.columns}
              			style={{height: 500}}
              		/>
                </div>
            </li>
        );
    }
});

module.exports = Result;
