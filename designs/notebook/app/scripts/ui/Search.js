var React = window.React = require('react');
var Reflux = require('reflux');
// Controller
var WorkspaceStore = require('../stores/WorkspaceStore.js');
var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');

var Match = require('./Match.js');

var Search = React.createClass({
    mixins: [Reflux.listenTo(PageStore,"onPageStoreUpdate")],
    onPageStoreUpdate: function(store){
        if(this.state.search.length>0){
          this.search(this.state.search);
        }
    },
    close: function() {
        WorkspaceStore.closePage(this.props.pageIndex);
    },
    getInitialState: function(){
      if(typeof(this.props.page)!=="undefined" && typeof(this.props.page.term)!=="undefined")
        setTimeout(()=>this.search(this.props.page.term),10);

      return {saved:false,search:'',matches: null};
    },
    save: function(){
      //TODO: implement
      this.setState({saved:true});
    },
    searchChange: function(event){
      var value = event.target.value;
      this.search(value);
    },
    search: function(term){
      PageStore.search(term, matches=>{
        this.setState({matches:matches});
      });
      this.setState({search:term});
    },
    openPage: function(pageKey){
      WorkspaceStore.openPage(pageKey);
    },
    render: function() {
      var matches = this.state.matches;

      const hasMatches = matches!==null;
      const numMatches = hasMatches?matches.length:0;

      return (
          <li className="page">
              <div className="head">
                  <b> Search {this.state.saved?(null):"*"}
                      <small>
                          {this.props.pageIndex}</small>
                      <button className="close" onClick={this.close}>X</button>
                  </b>
                  <div className="actions">
                      {!this.state.saved?<button onClick={this.save}>Save</button>:null}
                  </div>
              </div>
                <div className="searchResults">
                  <input onChange={this.searchChange} value={this.state.search}/>
                  Search results
                  <br/>
                  {hasMatches?"Matches: " + numMatches:null}
                  <br/>
                  <ul>
                  {hasMatches?matches.map((match,i)=>{return <Match key={i} match={match} onClick={()=>{this.openPage(match.pageKey)}} term={this.state.search}/>}):null}
                  </ul>
                </div>
          </li>
      );
    }
});

module.exports = Search;
