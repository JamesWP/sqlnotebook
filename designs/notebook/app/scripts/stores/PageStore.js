var Reflux = require('reflux');

var objKeys = require('../helpers/objKeys.js');

const PAGE_TYPE_CODE = "code";
const PAGE_TYPE_RESULT = "result";

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
      "name":pageName,
      "type":PAGE_TYPE_CODE
    };
    this.onUpdate();
  },
  pageCreateResult:function(pageKey,pageName){
    this.pages[pageKey] = {
      "name": pageName,
      "type": PAGE_TYPE_RESULT
    };
    this.onUpdate();
  },
  pageSave:function(pageKey,newContent){
    let page = this.pages[pageKey];

    if(typeof(page.content)!=="undefined"){
      if(!page.oldContent) page.oldContent = [];
      page.oldContent.push({
        content: page.content,
        date: page.date
      });
    }

    page.content = newContent;
    page.date = new Date();

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
