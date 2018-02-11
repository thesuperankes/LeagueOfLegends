var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io');

app.get('/', (req,res)=>{
    res.sendfile(__dirname + '/public/Views/index.html')
});

app.use('public',express.static(__dirname + 'public'));

http.listen(process.env.PORT || 3000,()=>{
    console.log('listen on port: 3000');
});