var omap = require('../helpers/objItter.js').map;

var Binder = React.createClass({
  render: function(){
    var tabs = omap(this.props.tabs,function(tkey,tab){
      return (<li key={tkey}>{tab.name}</li>);
    });
    return (
      <div className={"binder"}>
        <h1>Binder</h1>
        <ul>{tabs}</ul>
      </div>
    );
  }
});

module.exports = Binder;
