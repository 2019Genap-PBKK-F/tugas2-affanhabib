var express = require('express');
var app = express();
const hostname = '10.199.14.46';
const port = 8018;

var mahasiswaController = require('./mahasiswa/mahasiswaController')();

app.get('/',function(request, response){
  response.json({'Message':'Welcome'});
});
app.use('/api/mahasiswa', mahasiswaController);

app.listen(port, function(){
  var Message = 'Server running on Port: ' + port;
  console.log(Message);
});