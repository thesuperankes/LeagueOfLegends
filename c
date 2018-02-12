warning: LF will be replaced by CRLF in package-lock.json.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in package.json.
The file will have its original line endings in your working directory.
[1mdiff --git a/app.js b/app.js[m
[1mindex 5713ba4..5da3768 100644[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@ -1,14 +1,57 @@[m
 var express = require('express');[m
 var app = express();[m
 var http = require('http').Server(app);[m
[31m-var io = require('socket.io');[m
[32m+[m[32mvar io = require('socket.io')(http);[m
[32m+[m
[32m+[m[32mvar consumeApi = require('./public/Controllers/consumeLolApi.js');[m
[32m+[m
[32m+[m[32mvar ChampionC = require('./public/Models/ChampionMaestries');[m
[32m+[m[32mvar SummonerC = require('./public/Models/Summoner');[m
[32m+[m
[32m+[m[32mvar champList = Array<ChampionC.ChampionMaestries>[];[m
[32m+[m[32mvar summoner = SummonerC.Summoner;[m
[32m+[m
[32m+[m[32m// let listchamps = consumeApi.getChampMaestries(202063,function(err, body){[m
[32m+[m[32m//     if(err){[m
[32m+[m[32m//         console.log(err);[m
[32m+[m[32m//     }else{[m
[32m+[m[32m//         var response = body;[m
[32m+[m[32m//         let champList = JSON.parse(response);[m
[32m+[m[32m//         for(var i = 0; i<champList.length;i++){[m
[32m+[m[32m//             console.log(champList[i].championId);[m
[32m+[m[32m//         }[m
[32m+[m[32m//     }[m
[32m+[m[32m// });[m
[32m+[m
[32m+[m[32mfunction getSummoner(username){[m
[32m+[m[41m    [m
[32m+[m[32m}[m
 [m
 app.get('/', (req,res)=>{[m
     res.sendfile(__dirname + '/public/Views/index.html')[m
 });[m
 [m
[31m-app.use('public',express.static(__dirname + 'public'));[m
[32m+[m[32mapp.use('/public',express.static(__dirname + '/public'));[m
 [m
 http.listen(process.env.PORT || 3000,()=>{[m
     console.log('listen on port: 3000');[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mio.on('connection',(socket)=>{[m
[32m+[m[32m    console.log("connected");[m
[32m+[m[41m    [m
[32m+[m[32m    socket.on('getUser',(data)=>{[m
[32m+[m[41m        [m
[32m+[m[32m        console.log('llego a getUser de lado del servidor');[m
[32m+[m[32m        consumeApi.getPlayerByName(data,(err,body)=>{[m
[32m+[m[32m            if(err){[m
[32m+[m[32m                console.log(err);[m
[32m+[m[32m            }else{[m
[32m+[m[32m                var response = body;[m
[32m+[m[32m                let summoner = JSON.parse(response);[m
[32m+[m[32m                socket.emit('getName',summoner);[m
[32m+[m[32m                // console.log(summoner.name);[m
[32m+[m[32m            }[m
[32m+[m[32m        });[m
[32m+[m[32m    });[m
 });[m
\ No newline at end of file[m
[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex dc4112d..5bbc9ac 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -3390,6 +3390,11 @@[m
         "mime-types": "2.1.17"[m
       }[m
     },[m
[32m+[m[32m    "typescript": {[m
[32m+[m[32m      "version": "2.7.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/typescript/-/typescript-2.7.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-bqB1yS6o9TNA9ZC/MJxM0FZzPnZdtHj0xWK/IZ5khzVqdpGul/R/EIiHRgFXlwTD7PSIaYVnGKq1QgMCu2mnqw=="[m
[32m+[m[32m    },[m
     "ultron": {[m
       "version": "1.1.1",[m
       "resolved": "https://registry.npmjs.org/ultron/-/ultron-1.1.1.tgz",[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 9c1d4b4..efb13ad 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -29,6 +29,7 @@[m
     "lodash": "^4.17.5",[m
     "nodemon": "^1.14.12",[m
     "request": "^2.83.0",[m
[31m-    "socket.io": "^2.0.4"[m
[32m+[m[32m    "socket.io": "^2.0.4",[m
[32m+[m[32m    "typescript": "^2.7.1"[m
   }[m
 }[m
[1mdiff --git a/public/Views/index.html b/public/Views/index.html[m
[1mindex aee5466..c5387c5 100644[m
[1m--- a/public/Views/index.html[m
[1m+++ b/public/Views/index.html[m
[36m@@ -1,8 +1,38 @@[m
 <html>[m
     <head>[m
[31m-        <script src="/src/socket.io.js"></script>[m
[32m+[m[32m        <script src="Public/Views/src/socket.io.js"></script>[m[41m[m
[32m+[m[32m        <link rel="stylesheet" href="Public/Views/src/bootstrap.min.css">[m[41m[m
[32m+[m[32m        <script lenguage="Javascript">[m[41m[m
[32m+[m[32m        var socket = io();[m[41m[m
[32m+[m[41m[m
[32m+[m[32m        function checkUser(form){[m[41m[m
[32m+[m[32m            var username = form.fname.value;[m[41m[m
[32m+[m[32m            console.log('se consumio');[m[41m[m
[32m+[m[32m            socket.emit('getUser',username);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m            socket.on('getName',(data)=>{[m[41m[m
[32m+[m[32m                if(data.name != "" || data.name != undefined){[m[41m[m
[32m+[m[32m                    console.log(data.name);[m[41m[m
[32m+[m[32m                    document.getElementById("titulo").innerHTML = data.name;[m[41m[m
[32m+[m[32m                    var url = 'http://ddragon.leagueoflegends.com/cdn/8.3.1/img/profileicon/'+data.profileIconId+'.png'[m[41m[m
[32m+[m[32m                    document.getElementById('profileIcon').src=url;[m[41m[m
[32m+[m[41m[m
[32m+[m[32m                }[m[41m[m
[32m+[m[32m            });[m[41m[m
[32m+[m[32m        }[m[41m[m
[32m+[m[32m        </script>[m[41m[m
     </head>[m
     <body>[m
[31m-[m
[32m+[m[32m        <div class="jumbotron">[m[41m[m
[32m+[m[32m                <img width="128px" height="128px" id="profileIcon" src="http://ddragon.leagueoflegends.com/cdn/8.3.1/img/profileicon/">[m[41m[m
[32m+[m[32m                <h1 name="titulo" id="titulo">importando socket.io</h1>[m[41m[m
[32m+[m[32m        </div>[m[41m[m
[32m+[m[41m        [m
[32m+[m[32m        <form id="getUser">[m[41m[m
[32m+[m[32m            <label>Username</label>[m[41m[m
[32m+[m[32m            <input type="text" name="fname">[m[41m[m
[32m+[m[32m            <input type="button" onclick="checkUser(this.form)" value="Submit">[m[41m[m
[32m+[m[32m        </form>[m[41m[m
[32m+[m[41m        [m
     </body>[m
 </html>[m
\ No newline at end of file[m
