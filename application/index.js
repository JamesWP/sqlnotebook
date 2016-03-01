const express = require('express');
const Conf = require('./configuration.js');

var app = express();

var data = {
  d:{},
  get: function (id) { return this.d[id]; },
  put: function (id,dat) { this.d[id] = dat; }
};

app.use(express.static('dist'));

// setup routes
app.get('/', (req, res)=>{
  res.send('Hello world');
});

app.get('/content/:name', function (req, res) {
  const name = req.params.name;
  const d = data.get(name);
  if(d!==undefined)
    res.send(d);
  else {
    res.status(404).send('Not found');
  }
});

app.post('/content/:name', function(req, res){
  const name = req.params.name;
  var postData = '';
  req.on('data', function(chunk) {
      postData += chunk;
  });

  req.on('end', function() {
      req.rawBody = postData;

      console.log('posted:');
      console.log(postData);
      data.put(name,postData);
      res.send('OK');
  });
});


// RUN server
app.listen(Conf.PORT, function () {
  console.log('Sqlnotebook client listening on port ' + Conf.PORT);
});
