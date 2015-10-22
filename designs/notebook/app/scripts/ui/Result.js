var React = window.React = require('react'),
    Codemirror = require('react-codemirror');
// Controller
var SqlNotebookController = require('../controller/main.js');
var Execute = require('../controller/execute.js');

var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;


var Result = React.createClass({
    close:function(){
      SqlNotebookController.processMessage({
        type:SqlNotebookController.messageTypes.closePage,
        index:this.props.pageIndex
      });
    },
    render: function() {
        var options = {
          lineNumbers:true
        };
        var content = this.props.page.content;
        var table = content.Parts[0];
        var columns = table.Columns;
        var rows = table.Rows;
        var rowGetter = function(index){return rows[index].Values;};
        var Cols = columns.map(function(col,i){
          return <Column label={col.Name} dataKey={i} width={100}/>;
        });
        return (
            <li className="page">
                <b>Result
                    {this.props.pageIndex}</b>
                  <div className="actions">
                    <button onClick={this.close}>Close</button>
                  </div>
                  <Table
                    rowHeight={30}
                    rowGetter={rowGetter}
                    rowsCount={rows.length}
                    width={400}
                    maxHeight={1000}
                    headerHeight={50}>
                    {Cols} 
                  </Table>
            </li>
          );
    }
});

module.exports = Result;
