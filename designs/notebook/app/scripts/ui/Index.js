var React = window.React = require('react');
var Reflux = require('reflux');
var moment = require('moment');


// Controller
var PageStore = require('../stores/PageStore.js');
var WorkspaceStore = require('../stores/WorkspaceStore.js')

// My helpers
var omap = require('../helpers/objItter.js').map;

var Index = React.createClass({
    mixins: [Reflux.connect(PageStore,"pages")],
    openPage: function(pkey){
      WorkspaceStore.openPage(pkey);
    },
    close: function() {
        WorkspaceStore.closePage(this.props.pageIndex);
    },
    render: function() {
        var pages = omap(this.state.pages, (pkey, page) => {
          if(!page) return null;
          return (
              <li key={pkey}>
                <b>{page.name}</b>
                <button onClick={()=>this.openPage(pkey)}>open</button>
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
