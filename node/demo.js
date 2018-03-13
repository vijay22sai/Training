var fs = require('fs');
var request = require('request');

// setTimeout(function() {
//   console.time('readFile');
//   fs.readFile('./dummy.md', (err, data) => {
//     console.timeEnd('readFile');
//     console.log(data.toString());
//     console.time('google');
//     request('http://google.com', (err1, data1) => {
//       console.timeEnd('google');
//       console.log('response from google!');
//     });
//     console.time('facebook');
//     request('http://facebook.com', (err2, data2) => {
//       console.timeEnd('facebook');
//       console.log('response from fb!');
//     })
//   });
// }, 3000);

// setTimeout, setInterval, setImmediate, process.nextTick

// var http = require('http');
//
// http.createServer(function(req, res) {
//   let url = req.url.substr(1);
//   console.log(url);
//   res.end('hello ' + url.substr(3));
// }).listen(10001);
//
//


var express = require('express');


var app = express();

app.get('/users/all', (req, res) => {
  res.end('all users');
});

app.get('/isEven', (req, res) => {
  console.log(req.query.num);
  res.end(req.query.num % 2 === 0 ? 'even': 'odd');
});

app.get('/users/:userId', (req, res) => {
  res.end('user vijay');
});

app.listen(10001, (err, obj) => {
  console.log('server listening on port ' + 10001);
});





