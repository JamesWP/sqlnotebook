var React = window.React = require('react');
var moment = require('moment');


// Controller
var SqlNotebookController = require('../controller/main.js');

// My helpers
var omap = require('../helpers/objItter.js').map;

function getoldversions(page) {
    if (page.oldContent)
        return page.oldContent.map(function(old, i) {
            var date = moment(old.time).fromNow();
            return <li key={i}>{date}</li>
        });
    else
        return;
    }

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
    close: function() {
        SqlNotebookController.processMessage({type: SqlNotebookController.messageTypes.closePage, index: this.props.pageIndex});
    },
    render: function() {
        var pages = omap(this.state.pages.pages, function(pkey, page) {
            var oldversions = getoldversions(page);
            return (page.oldContent)?(
                <li key={pkey}>
                    <b>{page.title}</b>
                    <ul>{oldversions}</ul>
                </li>
            ):(
                <li key={pkey}>
                  <b>{page.title}</b>
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
