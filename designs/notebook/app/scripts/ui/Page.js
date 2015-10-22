var React = window.React = require('react'),
    Codemirror = require('react-codemirror');
// Controller
var SqlNotebookController = require('../controller/main.js');
var Execute = require('../controller/execute.js');


var Page = React.createClass({
    getInitialState:function(){return {conTok: ''};},
    updateCode: function(newCode) {
      SqlNotebookController.processMessage({
        type:SqlNotebookController.messageTypes.saveTempPage,
        pageIndex:this.props.pageIndex,
        content:newCode
      });
    },
    save:function(){
      SqlNotebookController.processMessage({
        type:SqlNotebookController.messageTypes.savePage,
        address: this.props.page.page,
        content:this.props.page.content
      });
    },
    close:function(){
      SqlNotebookController.processMessage({
        type:SqlNotebookController.messageTypes.closePage,
        index:this.props.pageIndex
      });
    },
    connect:function(){
      var P = this;
      Execute.newSession({},function(conTok){
        P.state.conTok = conTok;
        P.setState(P.state);
      });
    },
    execute:function(){
      var P = this;
      if(P.state.conTok.length>0){
        Execute.execute({conTok: P.state.conTok},function(result){
          SqlNotebookController.processMessage({
            type:SqlNotebookController.messageTypes.resultReceived,
            index:P.props.pageIndex,
            result:result
          });
        });
      }
    },
    render: function() {
        var options = {
          lineNumbers:true
        };
        return (
            <li className="page">
                <b>Page
                    {this.props.pageIndex}</b>
                  <div className="actions">
                    <button onClick={this.save}>Save</button>
                    <button onClick={this.close}>Close</button>
                    <button onClick={this.connect}>Connect</button>
                    <button onClick={this.execute}>Execute</button>
                  </div>
                <Codemirror value={this.props.page.content} onChange={this.updateCode} options={options}/>
            </li>
          );
    }
});

module.exports = Page;
