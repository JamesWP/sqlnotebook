const express = require('express');
const Conf = require('./configuration.js');

var app = express();

var data = require('./persistance');

app.use(express.static('dist'));

// setup routes
app.get('/', (req, res)=>{
  res.send('Hello world');
});

app.get('/content/:name', function (req, res) {
  const name = req.params.name;
  data.get(name, d=>{
    if(d!==undefined)
      res.status(200).send(d);
    else {
      res.status(404).send('Not found');
    }
  });
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
      res.status(200).send('OK');
  });
});


// RUN server
app.listen(Conf.PORT, function () {
  console.log('Sqlnotebook client listening on port ' + Conf.PORT);
});
