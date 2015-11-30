// My helpers
var objKeys = require('../helpers/objKeys.js');


// Initial config
var initial = require('./init.json');

// Local vars
var state = JSON.parse(JSON.stringify(initial));

var messageTypes = {
  stateChange: "stateChange",
  makeNewTab:"makeNewTab",
  binderSelectTab: "binderSelectTab",
  makeNewPage:"makeNewPage",
  savePage:"savePage",
  openPage:"openPage",
  openIndex:"openIndex",
  closePage:"closePage",
  saveTempPage:"saveTempPage",
  resultReceived:"resultReceived"
};

var listeners = {
  "stateChange":[]
};

function getState(){
  return state;
}

function getPages(tabKey){
  return state.tabs[tabKey];
}

function processMessage(message){
  console.log("ProcessMessage", message);
  switch(message.type){
    case messageTypes.binderSelectTab:
        // new tab selected in binder
        var tabID = message.tabID;
        state.selectedTab = tabID;
        triggerEvent(messageTypes.stateChange);
        break;
    case messageTypes.makeNewTab:
        // new tab created
        var tabName = message.tabName;
        var tabKey = objKeys.newKeyTo(state.tabs,tabName);
        state.tabs[tabKey] = {name:tabName};
        triggerEvent(messageTypes.stateChange);
        break;
    case messageTypes.makeNewPage:
        // new blank code page created
        var tabID = message.tabID;
        var pageName = message.pageName;
        var pages = state.tabs[tabID].pages || {};
        var pageKey = objKeys.newKeyTo(pages,pageName);
        state.tabs[tabID].pages = pages;
        state.tabs[tabID].pages[pageKey] = {title:pageName};
        triggerEvent(messageTypes.stateChange);
        break;
    case messageTypes.savePage:
        // save contense of page back into tab
        var address = message.address,tabID = address[0],pageID = address[1];
        var page = state.tabs[tabID].pages[pageID];
        var content = message.content;
        var oldContent = page.content;
        var oldDate = page.date;
        page.content = content;
        page.date = new Date();
        var oldVersions = page.oldContent || [];
        if(oldContent) oldVersions.push({
          time:oldDate,
          content:oldContent
        });
        page.oldContent = oldVersions;
        triggerEvent(messageTypes.stateChange);
        break;
    case messageTypes.openPage:
        // open page from tab into workspace
        // as code page
        var address = message.address,tabID = address[0],pageID = address[1];
        // if message has content then use that, else load content
        var content = message.content || state.tabs[tabID].pages[pageID].content;
        state.workspace.pages.push({
          page:address,
          content:content,
          type:"code"
        });
        triggerEvent(messageTypes.stateChange);
        break;
    case messageTypes.openIndex:
        // open index page for the tab
        var tabKey = message.tabKey;
        state.workspace.pages.push({
          tabKey:tabKey,
          type:"index"
        });
        triggerEvent(messageTypes.stateChange);
        break;
    case messageTypes.saveTempPage:
        // content changed in page rerender
        var pageIndex = message.pageIndex;
        var content = message.content
        state.workspace.pages[pageIndex].content=content;
        triggerEvent(messageTypes.stateChange);
        break;
    case messageTypes.closePage:
        // page closed
        var pageIndex = message.index;
        state.workspace.pages[pageIndex].closed=true;
        triggerEvent(messageTypes.stateChange);
        break;
    case messageTypes.resultReceived:
        // result for execution has been received from a code page
        var content = message.result;
        state.workspace.pages.push({
          page:[],
          content:content,
          type:"result"
        });
        triggerEvent(messageTypes.stateChange);
        break;
  }
}

function triggerEvent(messageType){
  var listenerGroup = listeners[messageType];
  if(listenerGroup===undefined)
    throw "no such messageType: "+ messageType;
  for(var i=0;i<listenerGroup.length;i++)
    listenerGroup[i](messageType);
}

function registerListener(messageType, message){
  var listenerGroup = listeners[messageType];
  if(listenerGroup===undefined)
    throw "no such messageType: "+ messageType;
  listenerGroup.push(function(mt){
    setTimeout(function(){message(mt);},0);
  });
}

module.exports = {
  messageTypes: messageTypes,
  getState: getState,
  getPages: getPages,
  processMessage: processMessage,
  registerListener: registerListener
};
