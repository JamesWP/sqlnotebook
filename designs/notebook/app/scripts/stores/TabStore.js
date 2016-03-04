var Reflux = require('reflux');

var objKeys = require('../helpers/objKeys.js');
var objItter = require('../helpers/objItter.js');

var TabActions = Reflux.createActions([
    "tabCreate",
    "tabDelete",
    "tabLinkPage",
    "tabUnlinkPage"
]);

// Creates a DataStore
var TabStore = Reflux.createStore({
  init: function() {
    this.listenToMany(TabActions);
    this.tabs = {};
  },
  getInitialState:function(){
    return this.tabs;
  },
  tabCreate:function(tabKey,tabName){
    this.tabs[tabKey] = {
      "name":tabName,
      "pages":{}
    };
    this.onUpdate();
  },
  tabDelete:function(tabKey){
    this.tabs[tabKey] = undefined;
    this.onUpdate();
  },
  tabLinkPage:function(tabKey,pageKey){
    this.tabs[tabKey].pages[pageKey] = true;
    this.onUpdate();
  },
  tabUnlinkPage:function(tabKey,pageKey){
    this.tabs[tabKey].pages[pageKey] = false;
    this.onUpdate();
  },
  // trigger update
  onUpdate:function(){
    this.trigger(this.tabs);
  },
  searchPage:function(pageKey){
    return objItter.map(this.tabs,(tabKey,tab)=>{
      if(typeof(tab.pages[pageKey]) !== 'undefined')
        return tabKey;
      else return null;
    }).filter((x)=>{return !!x;});
  },
  // convenience functions
  createNewKey:function(newTabName){
    return objKeys.newKeyTo(this.tabs,newTabName);
  },
  getData: function(){
    return {
      'tabs': this.tabs
    };
  },
  setData: function(data){
    this.tabs = data.tabs;
    this.onUpdate();
  }
});

module.exports = TabStore;
