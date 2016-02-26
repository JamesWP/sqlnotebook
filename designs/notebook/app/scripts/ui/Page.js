var React = window.React = require('react');
var Reflux = require('reflux');
var Links = require('./Links.js');
require('codemirror/mode/sql/sql.js');
require('codemirror/mode/markdown/markdown.js');
require('codemirror/addon/edit/matchbrackets.js');

var WorkspaceStore = require('../stores/WorkspaceStore.js');
var PageStore = require('../stores/PageStore.js');

var Codemirror = require('react-codemirror');
// Controller
var SqlNotebookController = require('../controller/main.js');
var Execute = require('../controller/execute.js');

import PageActionBar from './PageActionBar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';

const MODE_NORMAL = "NORMAL";
const MODE_REQUEST_CONFIRM = "REQUEST_CONFIRM";
const MODE_LINKS = "LINKS";

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
    showLinks: function(){
      this.setState({mode:MODE_LINKS});
    },
    closeLinks: function() {
      this.setState({mode:MODE_NORMAL});
    },
    render: function() {
        //debugger;
        var options = {
            lineNumbers: true,
            mode: this.props.format=="sql"?"text/x-mssql":"text/x-markdown",
            matchBrackets: true
        };

        var linksout = PageStore.getLinksFrom(this.props.pageKey);
        var linksin = PageStore.getLinksTo(this.props.pageKey);

        var thisPage = this.state.pages[this.props.pageKey];

        let menuItems = [
              <MenuItem key="save" leftIcon={<FontIcon className="fa fa-save"/>} primaryText="Save" onClick={this.save}/>,
              <MenuItem key="link" leftIcon={<FontIcon className="fa fa-link"/>} primaryText="Links" secondaryText={"" + (linksout.length + linksin.length)} onClick={this.showLinks}/>
            ];

        if (this.props.format!=="sql");
        else if(this.state.conTok.length > 0){
          menuItems.push(<Divider key={1}/>);
          menuItems.push(<MenuItem key="refresh" leftIcon={<FontIcon className="fa fa-refresh"/>} primaryText="Reconnect" onClick={this.connect}/>);
          menuItems.push(<MenuItem key="exec" leftIcon={<FontIcon className="fa fa-paper-plane"/>} primaryText="Execute" onClick={this.execute}/>);
        }else{
          menuItems.push(<Divider key={2}/>);
          menuItems.push(<MenuItem key="connect" leftIcon={<FontIcon className="fa fa-magic"/>} primaryText="Connect" onClick={this.connect}/>);
        }



        switch(this.state.mode){
            case MODE_REQUEST_CONFIRM:
            return (
              <div className="page">
                <PageActionBar
                  close={false}
                  title={(
                    <span>{thisPage.name} {this.state.altered?"*":null}
                      <small> {this.props.pageIndex}</small></span>
                    )}
                  onClose={this.close}
                  >{menuItems}</PageActionBar>
                  <div>
                      <b>You have unsaved changes!</b>
                      <br/>
                      Please confirm you wish to exit and discard changes.
                      <br/>
                      <button onClick={()=>{this.confirmClose(true);}} >Close and discard</button>
                      <br/>
                      <button onClick={()=>{this.confirmClose(false);}}>Cancel close</button>
                  </div>
              </div>
            );
            case MODE_LINKS:
            return (
              <div className="page">
                <PageActionBar
                  title={(
                    <span>{thisPage.name} {this.state.altered?"*":null}
                      <small> {this.props.pageIndex}</small></span>
                    )}
                  onClose={this.close}
                  >{menuItems}</PageActionBar>
                  <div>
                      <Links pageKey={this.props.pageKey} in={linksin} out={linksout}/>
                      <button onClick={()=>{this.closeLinks();}}>close</button>
                  </div>
              </div>
            );
            default:
            return (
                <div className="page">
                    <PageActionBar
                      title={(
                        <span>{thisPage.name} {this.state.altered?"*":null}
                          <small> {this.props.pageIndex}</small></span>
                        )}
                      onClose={this.close}
                    >{menuItems}</PageActionBar>
                  <Paper style={{marginTop:10}}>
                    <Codemirror value={this.state.code} onChange={this.updateCode} options={options}/>
                  </Paper>
                </div>
            );
        }

    }
});

module.exports = Page;
