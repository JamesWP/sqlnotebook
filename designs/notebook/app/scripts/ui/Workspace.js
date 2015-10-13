var React = window.React = require('react')

// My components
var Page = require('./Page.js');

// My helpers
var flex = require('../helpers/flex.js');
var omap = require('../helpers/objItter.js').map;

var Workspace = React.createClass({
  render: function(){
    var pages = this.props.workspace.pages.map(function(page){
      return <li>{page.page}</li>;
    });
    return (
      <div style={flex.fill}>
        <h1>Workspace</h1>
        <ul>{pages}</ul>
      </div>
    );
  }
});

module.exports = Workspace;
