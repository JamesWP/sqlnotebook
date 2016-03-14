var React = window.React = require('react')


var Reflux = require('reflux');
var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');
var WorkspaceStore = require('../stores/WorkspaceStore.js');

// My components
var Page = {
  Code: require('./Page.js'),
  Result: require('./Result.js'),
  Index: require('./Index.js'),
  Search: require('./Search.js')
}
// My helpers
var omap = require('../helpers/objItter.js').map;

import Paper from 'material-ui/lib/paper';

var Workspace = React.createClass({
  mixins: [Reflux.connect(WorkspaceStore,"windows")],
  render: function(){
    var pages = this.state.windows
      .map((page,i) => {
        page.i = i;
        return page;
      })
      .filter(page => {
        return !page.closed;
      })
      .map(page => {
        let el = null;
        switch (page.type){
          case "result": el =  <Page.Result pageKey={page.pageKey} key={page.i} pageIndex={page.i} page={page}/>; break;
          case "index": el =  <Page.Index pageKey={page.pageKey} key={page.i} pageIndex={page.i} tabKey={page.tabKey}/>; break;
          case "search": el =  <Page.Search page={page} key={page.i} pageIndex={page.i}/>; break;
          case "markdown": el =  <Page.Code pageKey={page.pageKey} key={page.i} pageIndex={page.i} page={page} format={"markdown"}/>; break;
          default: el = <Page.Code pageKey={page.pageKey} key={page.i} pageIndex={page.i} page={page} format={"sql"}/>; break;
        }

        return <li style={{listStyle:'none', display:'flex'}} key={page.i}>{el}</li>;
      });

    return (
      <div className="workspace">
        <ul className="workarea">{pages}</ul>
      </div>
    );
  }
});

module.exports = Workspace;
