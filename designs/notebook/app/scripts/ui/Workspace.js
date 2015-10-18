var React = window.React = require('react')

// My components
var Page = require('./Page.js');

// My helpers
var omap = require('../helpers/objItter.js').map;

var Workspace = React.createClass({
  render: function(){
    var pages = this.props.workspace.pages.map(function(page,i){
      return <Page key={i} pageIndex={i} page={page}/>;
    });
    return (
      <div className="workspace">
        <h1>Workspace</h1>
        <ul className="workarea">{pages}</ul>
      </div>
    );
  }
});

module.exports = Workspace;
