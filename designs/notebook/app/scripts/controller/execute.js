
// ajax library
var request = require('superagent');


function newCallback(callback){
  return function(err,resp){
    if(!err && resp.ok){
      callback(resp.body);
    }else{
      console.log('error',resp);
      alert(resp.error);
    }
  };
}

function post(url,params,callback){
  request
    .post(url)
    .send(params)
    .type('application/json')
    .accept('application/json')
    .end(newCallback(callback));
}

var api = {
  base:'http://dev.datadrivenlogistics.com/JPTest/SqlNotebookAPI/api/Execution/',
  createContext:'CreateExecutionContext',
  execute:'Execute'
};

module.exports = {
  newSession: function(options, sessionCreated){
    options = {
      server: '10.110.205.57\\dev',
      username: 'sa',
      password: '00-DdlAdm!n',
      database: 'onswitch'
    };
    post(api.base+api.createContext,options,function(res){
      sessionCreated(res);
    });
  },
  execute: function(options, resultReceived){
    var query = JSON.stringify("select * from [user]");
    post(api.base+api.execute+'/'+options.conTok,query,function(res){
      resultReceived(res);
    });
  }
};
