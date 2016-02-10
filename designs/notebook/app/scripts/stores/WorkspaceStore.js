var Reflux = require('reflux');

var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');

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

    this.openIndexPage("t1");
    this.openPage("p1");
  },
  getInitialState:function(){
    return this.windows;
  },
  openPage:function(pageKey){
    var page = PageStore.getInitialState()[pageKey];
    switch(page.type){
        case "result":
          this.windows.push({
            type:"result",
            pageKey:pageKey,
            result:page.content
          });
          break;
        default:
          this.windows.push({
            type:"code",
            pageKey:pageKey,
            content:page.content
          });
    }
    this.onUpdate();
  },
  openResult: function(result, pageIndex){
    var pageKey = this.windows[pageIndex].pageKey;
    this.windows.push({
      type: "result",
      content: result,
      resultOf: pageKey
    });
    this.onUpdate();
  },
  openPageAtVersion(pageKey,index){
    var content = PageStore.getInitialState()[pageKey].oldContent[index];
    this.windows.push({
      type: "code",
      pageKey: pageKey,
      content: content.content
    });
    this.onUpdate();
  },
  openIndexPage:function(tabKey){
    var page = TabStore.getInitialState()[tabKey];
    this.windows.push({
      type:"index",
      tabKey:tabKey
    });
    this.onUpdate();
  },
  closePage:function(pageIndex){
    this.windows[pageIndex].closed=true;
    this.onUpdate();
  },
  savePage:function(pageIndex,content){
    var page = this.windows[pageIndex];
    var pkey = page.pageKey;
    PageStore.pageSave(pkey,content);
  },
  onUpdate:function(){
    this.trigger(this.windows);
  }
});

module.exports = WorkspaceAction;
