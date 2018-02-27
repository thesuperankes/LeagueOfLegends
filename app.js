var express= require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    app,
    router,
    server;

var consumeApi = require('./public/Controllers/consumeLolApi.js');



app = express();
app.use(bodyParser.json());

router = express.Router();

router.get('/champMaestries/:userid',(req,res)=>{
    var userid = req.params.userid;

    consumeApi.getChampMaestries(userid,(err,body)=>{
        if(err){
            console.log(err);
        }else{
            var response = body;
            let champList = JSON.parse(response);

            res.json(champList);
            console.log("entramos al championList")
            console.log(champList);
        }
        
    })
});

router.get('/summoner/:username',(req,res)=>{
    var username = req.params.username;

    consumeApi.getPlayerByName(username,(err,body)=>{
        if(err){
            console.log(err);
        }else{
            var response = body;
            var summoner = JSON.parse(response);
            res.json(summoner);
            console.log("consulta al getsummonername " + username);
        }
    });
    console.log(username);
});

router.get('/champ/:id',(req,res)=>{
    var champid = req.params.id;
    consumeApi.getChampDetailsById(champid,(err,body)=>{
        if(err){
            console.log(err);
        }else{
            var response = body;
            var champDetail = JSON.parse(response);
            res.json(champDetail);
            console.log("Champion Detail By Id" + champid);
        }
    });
});

router.get('/champjson/:name',(req,res)=>{
    var name = req.params.name;
    console.log(name);
    consumeApi.getChampDetailsByNameJson(name,(err,body)=>{
        if(err){
            console.log(err);
        }else{
            var response = body;
            var champDetail = JSON.parse(response);

            //console.log(testChamp.MonkeyKing);
            // console.log(name);
            res.json(champDetail);
        }
    });
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('User-Agent', 'javascript');
    next();
});

app.use('/api',router);

server = http.createServer(app);
server.listen(process.env.PORT || 3000,()=>{
    console.log("arrancamos el server");
});


// var ChampionC = require('./public/Models/ChampionMaestries');
// var SummonerC = require('./public/Models/Summoner');

// var champList = Array<ChampionC.ChampionMaestries>[];
// var summoner = SummonerC.Summoner;

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

// function getSummoner(username){
    
// }

// app.get('/', (req,res)=>{
//     res.sendfile(__dirname + '/public/Views/index.html')
// });



// app.use('/public',express.static(__dirname + '/public'));

// http.listen(process.env.PORT || 3000,()=>{
//     console.log('listen on port: 3000');
// });