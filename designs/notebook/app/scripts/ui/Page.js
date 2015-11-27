var React = window.React = require('react');

require('codemirror/mode/sql/sql');
require('codemirror/addon/edit/matchbrackets');

var Codemirror = require('react-codemirror');
// Controller
var SqlNotebookController = require('../controller/main.js');
var Execute = require('../controller/execute.js');

var Page = React.createClass({
    getInitialState: function() {
        return {conTok: ''};
    },
    updateCode: function(newCode) {
        SqlNotebookController.processMessage({type: SqlNotebookController.messageTypes.saveTempPage, pageIndex: this.props.pageIndex, content: newCode});
    },
    save: function() {
        SqlNotebookController.processMessage({type: SqlNotebookController.messageTypes.savePage, address: this.props.page.page, content: this.props.page.content});
    },
    close: function() {
        SqlNotebookController.processMessage({type: SqlNotebookController.messageTypes.closePage, index: this.props.pageIndex});
    },
    disconnnect: function() {
        this.state.conTok = "";
        this.setState(this.state);
    },
    connect: function() {
        this.disconnnect();
        var P = this;
        Execute.newSession({}, function(conTok) {
            P.state.conTok = conTok;
            P.setState(P.state);
        });
    },
    execute: function() {
        var P = this;
        if (P.state.conTok.length > 0) {Execute.execute({
                conTok: P.state.conTok, content: this.props.page.content
            }, function(result) {
                SqlNotebookController.processMessage({type: SqlNotebookController.messageTypes.resultReceived, index: P.props.pageIndex, result: result});
            });}
    },
    render: function() {
        var options = {
            lineNumbers: true,
            mode: "text/x-mssql",
            matchBrackets: true
        };
        var connectionButton;
        if (this.state.conTok.length > 0)
            connectionButton = (
                <div>
                    <button onClick={this.connect}>Reconnect</button>
                    <button onClick={this.execute}>Execute</button>
                </div>
            );
        else
            connectionButton = (
                <button onClick={this.connect}>Connect</button>
            );

        return (
            <li className="page">
                <div className="head">
                    <b>Page
                        {this.props.pageIndex}
                        <button className="close" onClick={this.close}>X</button></b>
                    <div className="actions">
                        <button onClick={this.save}>Save</button>
                        {connectionButton}
                    </div>
                </div>
                <Codemirror value={this.props.page.content} onChange={this.updateCode} options={options}/>
            </li>
        );
    }
});

module.exports = Page;
