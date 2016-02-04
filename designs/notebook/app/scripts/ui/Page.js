var React = window.React = require('react');
var Reflux = require('reflux');
require('codemirror/mode/sql/sql');
require('codemirror/addon/edit/matchbrackets');

var WorkspaceStore = require('../stores/WorkspaceStore.js');
var PageStore = require('../stores/PageStore.js');

var Codemirror = require('react-codemirror');
// Controller
var SqlNotebookController = require('../controller/main.js');
var Execute = require('../controller/execute.js');

var Page = React.createClass({
    mixins: [Reflux.connect(PageStore,"pages")],
    getInitialState: function() {
        return {conTok: '', code: this.props.page.content};
    },
    updateCode: function(newCode) {
        this.setState({code: newCode});
    },
    save: function() {
        WorkspaceStore.savePage(this.props.pageIndex, this.state.code);
    },
    close: function() {
        WorkspaceStore.closePage(this.props.pageIndex);
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
        //TODO: refactor this
        var P = this;
        if (P.state.conTok.length > 0) {Execute.execute({
                conTok: P.state.conTok, content: this.props.page.content
            }, function(result) {
                SqlNotebookController.processMessage({type: SqlNotebookController.messageTypes.resultReceived, index: P.props.pageIndex, result: result});
            });}
    },
    render: function() {
        //debugger;
        var options = {
            lineNumbers: true,
            mode: "text/x-mssql",
            matchBrackets: true
        };
        var thisPage = this.state.pages[this.props.page.pageKey];
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
                    <b>{thisPage.name}
                        <small> {this.props.pageIndex}</small>
                        <button className="close" onClick={this.close}>X</button>
                    </b>
                    <div className="actions">
                        <button onClick={this.save}>Save</button>
                        {connectionButton}
                    </div>
                </div>
                <Codemirror value={this.state.code} onChange={this.updateCode} options={options}/>
            </li>
        );
    }
});

module.exports = Page;
