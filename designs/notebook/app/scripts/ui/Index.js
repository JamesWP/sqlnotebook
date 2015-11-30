var React = window.React = require('react');
var moment = require('moment');


// Controller
var SqlNotebookController = require('../controller/main.js');

// My helpers
var omap = require('../helpers/objItter.js').map;

var Index = React.createClass({
    getInitialState: function() {
        return {pages: SqlNotebookController.getPages(this.props.tabKey)};
    },
    componentDidMount: function() {
        var app = this;
        SqlNotebookController.registerListener(SqlNotebookController.messageTypes.stateChange, function(messageType) {
            app.setState(app.getInitialState());
        });
    },
    openPage: function(pkey,content){
      var tabID = this.props.tabKey;
      SqlNotebookController.processMessage({
        type:SqlNotebookController.messageTypes.openPage,
        address:[tabID,pkey],
        content:content
      });
    },
    close: function() {
        SqlNotebookController.processMessage({type: SqlNotebookController.messageTypes.closePage, index: this.props.pageIndex});
    },
    render: function() {
        var top = this.openPage;
        var open = function(pkey,content){return function(){top(pkey,content);}};
        var pages = omap(this.state.pages.pages, function(pkey, page) {
            var oldversions;
            if (page.oldContent && page.oldContent.length>0)
                oldversions = page.oldContent.map(function(old, i) {
                    var date = moment(old.time).fromNow();
                    return (
                      <li key={i}>{date}
                        <button onClick={open(pkey,old.content)}>open</button>
                      </li>
                    );
                });
            return (page.oldContent)?(
                <li key={pkey}>
                    <b>{page.title}</b>
                    <ul>{oldversions}</ul>
                    <button onClick={open(pkey)}>open</button>
                </li>
            ):(
                <li key={pkey}>
                  <b>{page.title}</b>
                  <button onClick={open(pkey)}>open</button>
                </li>
            );
        });
        return (
            <li className="page">
                <div className="head">
                    <b>Index for tab
                        {this.props.tabKey}
                      <button className="close" onClick={this.close}>X</button></b>
                    <div className="actions">

                    </div>
                </div>
                <ul>
                  {pages}
                </ul>
            </li>
        );
    }
});

module.exports = Index;
