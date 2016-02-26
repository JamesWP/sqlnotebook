var Reflux = require('reflux');

var objKeys = require('../helpers/objKeys.js');
var objItter = require('../helpers/objItter.js');
const PAGE_TYPE_CODE = "code";
const PAGE_TYPE_TEXT = "markdown";
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
    this.pageCreate("p3","Page Three", {format:'text'});
    this.pageCreate('codetest','TestSql');
    this.pageSave("p1","test\ntesting\ntesting code\ncode rules")
    this.pageSave("p3","# main title\n\n this is content\n\ttabbed content is verbatum\n## level 2 heading");
    this.pageSave('codetest','select top 1 * from [user];');
    this.pageCreateResult('p1r','Page one result');
    let result = [
      {"columns":[
        {"name":"0","title":"uniqueID","width":100},
        {"name":"1","title":"displayName","width":100},
        {"name":"2","title":"userName","width":100},
        {"name":"3","title":"password","width":100},
        {"name":"4","title":"extentionID","width":100},
        {"name":"5","title":"enabled","width":100},
        {"name":"6","title":"sex","width":100},
        {"name":"7","title":"deleted","width":100},
        {"name":"8","title":"dob","width":100},
        {"name":"9","title":"noCallWithin","width":100},
        {"name":"10","title":"timeOffset","width":100}
      ],
      "rows":[
        {"0":1,"1":"James P","2":"jamesp","3":"james","4":7,"5":1,"6":"m","7":0,"8":null,"9":"1900-04-11T00:00:00","10":0,"ROWNOKEY":0}
      ]
    }];
    this.pageSave('p1r',result);
    this.linkCreate('codetest','p1r', {
      // created from link
      type:"resultOf"
    });
  },
  getInitialState:function(){
    return this.pages;
  },
  pageCreate:function(pageKey,pageName,opt){
    opt = opt || {};
    opt.format = opt.format || "sql";

    var pageType = opt.format==="sql"?PAGE_TYPE_CODE:PAGE_TYPE_TEXT;
    this.pages[pageKey] = {
      "name":pageName,
      "type":pageType,
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
  getLinks: function(){
    return this.pageLinks;
  },
  getLinksFrom: function(pageKey){
    if(typeof(this.pageLinks.from[pageKey])==="undefined") return [];
    return this.pageLinks.from[pageKey].map(
      (linkId)=>{return this.pageLinks.links[linkId];}
    );
  },
  getLinksTo: function(pageKey){
    if(typeof(this.pageLinks.to[pageKey])==="undefined") return [];
    return this.pageLinks.to[pageKey].map(
      (linkId)=>{return this.pageLinks.links[linkId];}
    );
  },
  getResultAsString: function(pageKey){
    var parts = this.pages[pageKey].content;

    var partsstrings = parts.map(part=>{
      var partstringarray = [];
      var cols = part.columns;
      var numCols = cols.length
      var rows = part.rows;
      // add column row
      partstringarray.push(cols.map(c=>c.title).join(', '));

      // add rows for each row
      partstringarray.push.apply(partstringarray,rows.map(row=>{
        var rowarr = [];
        for(var i=0;i<numCols;i++){
            rowarr.push(row[i]);
        }
        return rowarr.join(', ');
      }));

      return partstringarray.join('\n');
    });
    var allstring = partsstrings.join('\n');

    return allstring;
  },
  getPageContent: function(pageKey){
    var page = this.pages[pageKey];
    switch(page.type){
      case PAGE_TYPE_CODE:
        return (page.content?page.content:"");
      case PAGE_TYPE_RESULT:
        return this.getResultAsString(pageKey);
      default:
        return "";
    }
  },
  search: function(term,callback){
    if(term.length==0)
      callback([]);
    else setTimeout(()=>{
      var matches = objItter.map(this.pages,(key,page)=>{
        if(page===undefined) return;
        return this.getPageContent(key)
            .split('\n')
            .map((line,lineNumber)=>{return {lineNumber:lineNumber+1,line:line,pageKey:key};})
            .filter(c=> {
              var found = c.line.indexOf(term)>=0;
              return found;
            });
      }).filter(x=>{return x!==undefined && x.length>0;});
      // flattern
      matches = [].concat.apply([], matches);
      callback(matches);
    },0);
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
