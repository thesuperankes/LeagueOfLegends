var request = require('request');
let url = 'https://la1.api.riotgames.com/lol/';
const KEY = 'RGAPI-5e8f5202-11bc-4a02-8379-1b03adff7388';
var fs = require('fs');
var jsonquery = require('json-query');


var champjson = fs.readFileSync('public/Controllers/champions.json','utf-8');
var jsondetails = fs.readFileSync('public/Controllers/championsdetails.json','utf-8');


function createUrl(model){
    return url + model;
}
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

module.exports.getChampDetailsByNameJson = (champname,callback)=>{
    if(champname){
        if(champname === "all" ){
            callback(null,champjson);
        }
        champname = toTitleCase(champname);
        let json = JSON.parse(jsondetails);
        let champdetails = JSON.parse(champjson);
        let result = jsonquery('data[aliasname='+champname+'].name',{
            data:json
        });    
        if(result.value){
    // console.log(jsondetails);
    //console.log(Object.keys(json.data));

            console.log(champdetails.data[result.value].name);
            callback(null,JSON.stringify(champdetails.data[result.value]));
        }else{
            callback({statusCode: 404});
        }
    
    }else{
        callback({statusCode:404})
    }

    
}

module.exports.getChampMaestries = (userid,callback)=>{
    let url = createUrl('champion-mastery/v3/champion-masteries/by-summoner/'+userid+'?api_key='+KEY);
    var result = Array();
    request({
        url:url,
        json:true
    },(error,response,body)=>{
        if(error || response.statusCode !== 200){
            return callback(error || {statusCode: response.statusCode});
        }
        callback(null,JSON.stringify(body));
    });
}

module.exports.getPlayerByName = (username,callback)=>{
    let url = createUrl('summoner/v3/summoners/by-name/'+username+'?api_key='+KEY);
    var result = Array();
    request({
        url:url,
        json:true
    },(error,response,body)=>{
        if(error || response.statusCode !== 200){
            return callback(error || {statusCode: response.statusCode});
        }
        let result = {
            id: body.id,
            name:body.name,
            imageProfile: body.profileIconId,
            level: body.summonerLevel
        };
        callback(null,JSON.stringify(result));
    });
}

module.exports.getChampDetailsById = (champid,callback)=>{
    let url = createUrl('static-data/v3/champions/'+champid+'?locale=es_MX&tags=image&api_key='+KEY)
    var result = Array();
    request({
        url:url,
        json:true
    },(err,res,body)=>{
        if(err){
            return callback(err || {statusCode:res.statusCode});
        }
        callback(null,JSON.stringify(body));
    })
}