var React = window.React = require('react');

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';

var Link = React.createClass({
  render: function(){
    var link = this.props.link;
    return (
      <ListItem primaryText={"Type of link"} secondaryText={link.attrs.type} />
    );
  }
});

var Links = React.createClass({
  render: function() {
    let linksin = (
        <List>
          { this.props.in.length!=0?
            this.props.in.map((link,i)=>{
              return <Link key={i} link={link}/>;
            }):(<ListItem>No links</ListItem>)
          }
        </List>
    );
    let linksout = (
        <List>
          { this.props.out.length!=0?
            this.props.out.map((link,i)=>{
              return <Link key={i} link={link}/>;
            }):(<ListItem>No links</ListItem>)
          }
        </List>
    );
    return (
      <div>
        <Paper style={{margin:10,padding:10}}>
          <div><b>Links to this page</b></div>
          {linksin}
        </Paper>
        <Paper style={{margin:10,padding:10}}>
          <div><b>Links from this page</b></div>
          {linksout}
        </Paper>
      </div>
    );
  }
});

module.exports = Links;
