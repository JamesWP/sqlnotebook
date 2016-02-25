
var React = require('react');
var PageStore = require('../stores/PageStore.js');

function matchParts(str,term){
    var loc = str.indexOf(term);

    return [str.substr(0,loc),term,str.substr(loc + term.length,str.length-loc-term.length)];
}

var Match = React.createClass({
  onClick: function(e){
    if(typeof this.props.onClick ==="function")
      this.props.onClick(e);
  },
  render: function(){
    var match = this.props.match;
    var page = PageStore.getInitialState()[match.pageKey];
    var pageName = page.name;
    var term = this.props.term;
    var location = match.line.indexOf(term);
    var parts = matchParts(match.line,term);
    return (
      <li onClick={this.onClick}>
        <i>{pageName}</i>
      <small> location {match.lineNumber}:{location+1}-{location+1 + term.length}</small>
      <br/>
      Match:
      <br/>
      {parts[0]}<u><b>{parts[1]}</b></u>{parts[2]}
      </li>
    );
  }
});

module.exports = Match;
