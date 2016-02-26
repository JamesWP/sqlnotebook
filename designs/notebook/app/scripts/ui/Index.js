var React = window.React = require('react');
var Reflux = require('reflux');
var moment = require('moment');


// Controller
var PageStore = require('../stores/PageStore.js');
var WorkspaceStore = require('../stores/WorkspaceStore.js')

// My helpers
var omap = require('../helpers/objItter.js').map;

import PageActionBar from './PageActionBar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Avatar from 'material-ui/lib/avatar';

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

          let nestedItems = [];
          if(hasHistory)
            nestedItems = page.oldContent.map((c,i)=>{
              return <ListItem
                        key={i}
                        primaryText={c.date.toLocaleString()}
                        leftAvatar={<Avatar icon={<FontIcon className="fa fa-play" onClick={()=>this.openPageAtVersion(pkey,i)}/>}/>}
                        />;
            });

          return (
              <ListItem
                key={pkey}
                nestedItems={nestedItems}
                primaryText={page.name}
                secondaryText={page.date?page.date.toLocaleString():null}
                leftAvatar={<Avatar icon={<FontIcon className="fa fa-play" onClick={()=>this.openPage(pkey)}/>}/>}
                />
          );
        });
        return (
            <div className="page">
              <PageActionBar
                title={(<span>Index for tab {this.props.tabKey}</span>)}
                onClose={this.close}/>
              <List>
                {pages}
              </List>
            </div>
        );
    }
});

module.exports = Index;
