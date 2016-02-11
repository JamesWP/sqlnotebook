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
    this.pageLinks = {
      links:{}, // all the links by id {id:{from:key,to:key,attrs:{}}}
      from:{}, // index of link ids by from attr id:[linkid...]
      to:{} // index of link ids by to attr id:[linkid...]
    };
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

  /******** LINKS ********/
  linkCreate:function(fromPageKey,toPageKey,attributes){
    let linkId = this.createNewLinkKey();
    this.pageLinks.links[linkId] = {
      attrs: attributes,
      from: fromPageKey,
      to: toPageKey
    };

    // save indexes
    if(typeof (this.pageLinks.from[fromPageKey]) === "undefined")
        this.pageLinks.from[fromPageKey] = [];
    this.pageLinks.from[fromPageKey].push(linkId);

    if(typeof (this.pageLinks.to[toPageKey]) === "undefined")
        this.pageLinks.to[toPageKey] = [];
    this.pageLinks.to[toPageKey].push(linkId);
    this.onUpdate();
  },
  getLinks:function(){
    return this.pageLinks;
  },
  getLinksFrom:function(pageKey){
    if(typeof(this.pageLinks.from[pageKey])==="undefined") return [];
    return this.pageLinks.from[pageKey].map(
      (linkId)=>{return this.pageLinks.links[linkId];}
    );
  },
  getLinksTo:function(pageKey){
    if(typeof(this.pageLinks.to[pageKey])==="undefined") return [];
    return this.pageLinks.to[pageKey].map(
      (linkId)=>{return this.pageLinks.links[linkId];}
    );
  },
  /******** /LINKS ********/
  onUpdate:function(){
    this.trigger(this.pages);
  },
  // convenience functions
  createNewKey:function(newPageName){
    return objKeys.newKeyTo(this.pages, newPageName);
  },
  createNewLinkKey:function(){
    return objKeys.newKeyTo(this.pageLinks, "l");
  }
});

module.exports = PageActions;
