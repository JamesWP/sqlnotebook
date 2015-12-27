var Reflux = require('reflux');

var PageStore = require('../stores/PageStore.js');

var WorkspaceActions = Reflux.createActions([
    "openPage",
    "closePage"
]);

/**

{
  "type":""

}

**/
// Creates a DataStore
var WorkspaceAction = Reflux.createStore({
  init: function() {
    this.listenToMany(WorkspaceActions);
    this.windows = [];
  },
  getInitialState:function(){
    return this.windows;
  },
  openPage:function(pageKey){
    var page = PageStore.getInitialState()[pageKey];
    this.windows.push({
      type:"code",
      pageKey:pageKey,
      content:page.content
    });
    this.onUpdate();
  },
  openIndexPage:function(){

    this.onUpdate();
  },
  closePage:function(pageIndex){

    this.onUpdate();
  },
  onUpdate:function(){
    this.trigger(this.windows);
  }
});

module.exports = WorkspaceAction;
