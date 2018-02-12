var request = require('request');
let url = 'https://la1.api.riotgames.com/lol/';


function createUrl(model){
    return url + model;
}

module.exports.getChampMaestries = (userid,callback)=>{
    let url = createUrl('champion-mastery/v3/champion-masteries/by-summoner/'+userid+'?api_key=RGAPI-30605210-5be9-4d2b-917d-3f790bd2be37');
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
    let url = createUrl('summoner/v3/summoners/by-name/'+username+'?api_key=RGAPI-30605210-5be9-4d2b-917d-3f790bd2be37');
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