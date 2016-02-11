var React = window.React = require('react');


var Link = React.createClass({
  render: function(){
    var link = this.props.link;
    return (
      <li>
        Type of link: {link.attrs.type}
      </li>
    );
  }
});

var Links = React.createClass({
  render: function() {
    let linksin = (
        <ul>
          { this.props.in.length!=0?
            this.props.in.map((link,i)=>{
              return <Link key={i} link={link}/>;
            }):(<li>No links</li>)
          }
        </ul>
    );
    let linksout = (
        <ul>
          { this.props.out.length!=0?
            this.props.out.map((link,i)=>{
              return <Link key={i} link={link}/>;
            }):(<li>No links</li>)
          }
        </ul>
    );
    return (
      <div className={"links"}>
        <div><b>Links to this page</b></div>
        {linksin}
        <div><b>Links from this page</b></div>
        {linksout}
      </div>
    );
  }
});

module.exports = Links;
