var React = window.React = require('react')

// Controller
var SqlNotebookController = require('../controller/main.js');

// My helpers
var omap = require('../helpers/objItter.js').map;

var Tab = React.createClass({
    getInitialState: function() {
        return {
            value: ''
        };
    },
    handleChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },
    createPage: function(){
      var pageName = this.state.value;
      if(pageName.length>0){
        SqlNotebookController.processMessage({
          type:SqlNotebookController.messageTypes.makeNewPage,
          tabID: this.props.tabID,
          pageName:pageName
        });
        this.setState(this.getInitialState());
      }
    },
    openPage: function(pkey){
      var tabID = this.props.tabID;
      SqlNotebookController.processMessage({
        type:SqlNotebookController.messageTypes.openPage,
        address:[tabID,pkey]
      });
    },
    render: function() {
        var t = this;
        var tab = t.props.tab;
        var _openPage = function(pkey){
          return function(){t.openPage(pkey);}
        };
        var pages = omap(tab.pages, function(pkey, page) {
            return <li key={pkey} onClick={_openPage(pkey)}>{page.title}</li>;
        });
        return (
            <div className={"tab"}>
                <h1>{tab.name}</h1>
                <ul>{pages}</ul>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <br/>
                <button onClick={this.createPage}>Create new page</button>
            </div>
        );
    }
});

module.exports = Tab;
