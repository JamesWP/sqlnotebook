var Reflux = require('reflux');

var objKeys = require('../helpers/objKeys.js');

var PageActions = Reflux.createActions([
    "pageCreate",
    "pageDelete",
    "pageSave"
]);

// Creates a DataStore
var PageActions = Reflux.createStore({
  init: function() {
    this.listenToMany(PageActions);
    this.pages = {};
    this.pageCreate("p1","Page One");
    this.pageCreate("p2","Page Two");
  },
  getInitialState:function(){
    return this.pages;
  },
  pageCreate:function(pageKey,pageName){
    this.pages[pageKey] = {
      "name":pageName
    };
    this.onUpdate();
  },
  pageSave:function(pageKey,newContent){
    this.pages[pageKey].content = newContent;
    this.pages[pageKey].date = new Date();
    //TODO: save history
    this.onUpdate();
  },
  pageDelete:function(pageKey){
    this.pages[pageKey] = undefined;
    this.onUpdate();
  },
  onUpdate:function(){
    this.trigger(this.pages);
  },
  // convenience functions
  createNewKey:function(newPageName){
    return objKeys.newKeyTo(this.pages, newPageName);
  }
});

module.exports = PageActions;
