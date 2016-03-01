var Reflux = require('reflux');
var PageStore = require('./PageStore');
var TabStore = require('./TabStore');
var WorkspaceStore = require('./WorkspaceStore');

var request = require('request');

var ContentStoreActions = Reflux.createActions([
  "saveAll"
]);

const url = name => window.location.origin + "/content/" + name;

// Creates a DataStore
var ContentStore = Reflux.createStore({
  init: function() {
    this.listenToMany(ContentStoreActions);
  },
  saveAll: function(name) {
    let storeUrl = url(name);
    // get data from all stores into object
    let obj = {
      'pageStore': PageStore.getData(),
      'tabStore': TabStore.getData(),
      'workspaceStore': WorkspaceStore.getData()
    };
    // post object
    request.post(storeUrl).json(obj);
    // done
  },
  loadAll: function(name) {
    let storeUrl = url(name);
    // get data
    request.get(storeUrl, function(error,response,body){
      // update data in all stores
      if (!error && response.statusCode == 200) {
        let obj = JSON.parse(body);
        PageStore.setData(obj.pageStore);
        TabStore.setData(obj.tabStore);
        WorkspaceStore.setData(obj.workspaceStore);
      }else{
        console.log('response error', response);
      }
    });
  }
});

module.exports = ContentStore;
