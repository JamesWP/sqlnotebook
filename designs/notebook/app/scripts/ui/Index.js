var React = window.React = require('react');

// Controller
var SqlNotebookController = require('../controller/main.js');

// My helpers
var omap = require('../helpers/objItter.js').map;

function getoldversions(page){
  if(page.oldContent)
    return page.oldContent.map(function(old,i){
      return <li key={i}>{old.time.toString()}</li>
    });
  else
    return;
}

var Index= React.createClass({
    getInitialState:function(){
      return {
        pages: SqlNotebookController.getPages(this.props.tabKey)
      }; 
    },
    componentDidMount: function(){
      var app = this;
      SqlNotebookController.registerListener(
        SqlNotebookController.messageTypes.stateChange,
        function(messageType){ app.setState(app.getInitialState()); }
      );
    },
    close:function(){
      SqlNotebookController.processMessage({
        type:SqlNotebookController.messageTypes.closePage,
        index:this.props.pageIndex
      });
    },
    render: function() {
        var pages = omap(this.state.pages.pages, function(pkey, page) {
            var oldversions = getoldversions(page);
            return ( <li key={pkey}>
                <b>{page.title}</b>
                <ul>{oldversions}</ul>
              </li> );
        });
        return (
            <li className="page">
                <b>Index for tab
                    {this.props.tabKey}</b>
                  <div className="actions">
                    <button onClick={this.close}>Close</button>
                  </div>
                  <ul>
                    {pages}
                  </ul>
            </li>
          );
    }
});

module.exports = Index;
