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
    openPageAtVersion: function(pkey,index){
      WorkspaceStore.openPageAtVersion(pkey,index);
    },
    close: function() {
      WorkspaceStore.closePage(this.props.pageIndex);
    },
    render: function() {
        var pages = omap(this.state.pages, (pkey, page) => {
          if(!page) return null;
          const hasHistory = !!page.oldContent;
          return (
              <li key={pkey}>
                <b>{page.name}</b><small>{page.date?page.date.toString():null}</small>
                <button onClick={()=>this.openPage(pkey)}>open</button>
                {hasHistory?(
                  <ul>
                    {page.oldContent.map((c,i)=>{
                      return <li key={i} onClick={()=>this.openPageAtVersion(pkey,i)}>{c.date.toString()}</li>;
                    })}
                  </ul>
                ):null}
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
