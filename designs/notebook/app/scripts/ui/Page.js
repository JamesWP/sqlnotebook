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
        return {conTok: '', code: this.props.page.content, altered: false};
    },
    updateCode: function(newCode) {
        this.setState({code: newCode, altered:true});
    },
    save: function() {
        this.setState({altered: false});
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
        Execute.newSession({}, (conTok) => {
            this.state.conTok = conTok;
            this.setState(this.state);
        });
    },
    execute: function() {
        if (this.state.conTok.length > 0) {
          let ex = {
            conTok: this.state.conTok, content: this.state.code
          };
          Execute.execute(ex, (result) => {
            WorkspaceStore.openResult(result);
          });
        }
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
                    <b>{thisPage.name} {this.state.altered?"*":null}
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
