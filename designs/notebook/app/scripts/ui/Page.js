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

const MODE_NORMAL = "NORMAL";
const MODE_REQUEST_CONFIRM = "REQUEST_CONFIRM";

var Page = React.createClass({
    mixins: [Reflux.connect(PageStore,"pages")],
    getInitialState: function() {
        return {
          conTok: '',
          code: this.props.page.content,
          altered: false,
          mode: MODE_NORMAL
        };
    },
    updateCode: function(newCode) {
        this.setState({code: newCode, altered:true});
    },
    save: function() {
        this.setState({altered: false, mode: MODE_NORMAL});
        WorkspaceStore.savePage(this.props.pageIndex, this.state.code);
    },
    close: function() {
        if(this.state.altered){
          this.setState({mode: MODE_REQUEST_CONFIRM});
        }else{
          WorkspaceStore.closePage(this.props.pageIndex);
        }
    },
    confirmClose: function(confirmed){
      if(confirmed){
        // confirmed close with discard
        WorkspaceStore.closePage(this.props.pageIndex);
      }else{
        // cancel close
        this.setState({mode: MODE_NORMAL});
      }

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
            WorkspaceStore.openResult(result, this.props.pageIndex);
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

        switch(this.state.mode){
            case MODE_REQUEST_CONFIRM:
            return (
              <li className="page">
                  <div className="head">
                      <b>{thisPage.name} {this.state.altered?"*":null}
                          <small> {this.props.pageIndex}</small>
                          <button className="close" disabled={true}>X</button>
                      </b>
                      <div className="actions">
                          <button onClick={this.save}>Save</button>
                      </div>
                  </div>
                  <div>
                      <b>You have unsaved changes!</b>
                      <br/>
                      Please confirm you wish to exit and discard changes.
                      <br/>
                      <button onClick={()=>{this.confirmClose(true);}} >Close and discard</button>
                      <br/>
                      <button onClick={()=>{this.confirmClose(false);}}>Cancel close</button>
                  </div>
              </li>
            );
            default:
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

    }
});

module.exports = Page;
