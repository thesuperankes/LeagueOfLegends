var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var consumeApi = require('./public/Controllers/consumeLolApi.js');

var ChampionC = require('./public/Models/ChampionMaestries');
var SummonerC = require('./public/Models/Summoner');

var champList = Array<ChampionC.ChampionMaestries>[];
var summoner = SummonerC.Summoner;

// let listchamps = consumeApi.getChampMaestries(202063,function(err, body){
//     if(err){
//         console.log(err);
//     }else{
//         var response = body;
//         let champList = JSON.parse(response);
//         for(var i = 0; i<champList.length;i++){
//             console.log(champList[i].championId);
//         }
//     }
// });

function getSummoner(username){
    
}

app.get('/', (req,res)=>{
    res.sendfile(__dirname + '/public/Views/index.html')
});

app.use('/public',express.static(__dirname + '/public'));

http.listen(process.env.PORT || 3000,()=>{
    console.log('listen on port: 3000');
});

io.on('connection',(socket)=>{
    console.log("connected");
    
    socket.on('getUser',(data)=>{
        
        console.log('llego a getUser de lado del servidor');
        consumeApi.getPlayerByName(data,(err,body)=>{
            if(err){
                console.log(err);
            }else{
                var response = body;
                let summoner = JSON.parse(response);
                socket.emit('getName',summoner);
                // console.log(summoner.name);
            }
        });
    });
});