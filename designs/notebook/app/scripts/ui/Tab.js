var omap = require('../helpers/objItter.js').map;

var Tab = React.createClass({
  render: function(){
    var tab = this.props.tab;
    var pages = omap(tab.pages,function(pkey,page){
      return <ul key={pkey}>{page.title}</ul>;
    });
    return (
      <div>
        <h1>{tab.name}</h1>
        <ul>{pages}</ul>
      </div>
    );
  }
});

module.exports = Tab;
