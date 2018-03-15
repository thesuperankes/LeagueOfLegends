var request = require('request');
let url = 'https://la1.api.riotgames.com/lol/';
const KEY = 'RGAPI-c70ce09f-1bda-488a-ad4d-7429a35eaf16';
var fs = require('fs');
var jsonquery = require('json-query');


var champjson = fs.readFileSync('public/Controllers/champions.json', 'utf-8');
var jsondetails = fs.readFileSync('public/Controllers/championsdetails.json', 'utf-8');


function createUrl(model) {
    return url + model;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function getTier(playerid, callback) {

    var options = {
        method: 'GET',
        url: 'https://la1.api.riotgames.com/lol/league/v3/positions/by-summoner/' + playerid,
        qs: {
            api_key: KEY
        },
        headers: {
            'postman-token': '87dcb877-4765-2927-f4e3-4d34f748fb0c',
            'cache-control': 'no-cache'
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.log(error);
        }
        try {
            callback(null, body);
        } catch (ex) {
            callback(ex);
        }

    });
}

module.exports.getChampMaestries

module.exports.getChampDetailsByNameJson = (champname, callback) => {
    if (champname) {
        if (champname === "all") {
            callback(null, champjson);
        }
        champname = toTitleCase(champname);
        let json = JSON.parse(jsondetails);
        let champdetails = JSON.parse(champjson);
        let result = jsonquery('data[aliasname=' + champname + '].name', {
            data: json
        });
        if (result.value) {
            // console.log(jsondetails);
            //console.log(Object.keys(json.data));

            console.log(champdetails.data[result.value].name);
            callback(null, JSON.stringify(champdetails.data[result.value]));
        } else {
            callback({
                statusCode: 404
            });
        }

    } else {
        callback({
            statusCode: 404
        })
    }


}

module.exports.getChampMaestries = (userid, callback) => {
    let url = createUrl('champion-mastery/v3/champion-masteries/by-summoner/' + userid + '?api_key=' + KEY);
    var result = Array();
    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return callback(error || {
                statusCode: response.statusCode
            });
        }
        callback(null, JSON.stringify(body));
    });
}

module.exports.getPlayerByName = (username, callback) => {
    let url = createUrl('summoner/v3/summoners/by-name/' + username + '?api_key=' + KEY);
    var result = Array();
    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return callback(error || {
                statusCode: response.statusCode
            });
        }

        getTier(body.id, function(err, response) {

            if (err) {
                console.log(err.statusCode);
            } else {
                // console.log("Respuesta getTier "+ response);
                let res = JSON.parse(response);
                // console.log("Res " + res[0].tier);
                if (Object.keys(res).length !== 0) {
                    console.log("Array Summoner is not empty");
                    let result = {
                        id: body.id,
                        name: body.name,
                        imageProfile: body.profileIconId,
                        level: body.summonerLevel,
                        league: [{
                            leagueId: res[0].leagueId,
                            leagueName: res[0].leagueName,
                            tier: res[0].tier,
                            queueType: res[0].queueType,
                            rank: res[0].rank,
                            playerOrTeamId: res[0].playerOrTeamId,
                            playerOrTeamName: res[0].playerOrTeamName,
                            leaguePoints: res[0].leaguePoints,
                            wins: res[0].wins,
                            losses: res[0].losses,
                            veteran: res[0].veteran,
                            inactive: res[0].inactive,
                            freshBlood: res[0].freshBlood,
                            hotStreak: res[0].hotStreak
                        }]
                    };
                    callback(null, JSON.stringify(result));
                } else {
                    console.log("Array is empty");
                    let result = {
                        id: body.id,
                        name: body.name,
                        imageProfile: body.profileIconId,
                        level: body.summonerLevel
                    };
                    callback(null, JSON.stringify(result));
                }
            }
        });
    });
}

module.exports.getChampDetailsById = (champid, callback) => {
    let url = createUrl('static-data/v3/champions/' + champid + '?locale=es_MX&tags=image&api_key=' + KEY)
    var result = Array();
    request({
        url: url,
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err || {
                statusCode: res.statusCode
            });
        }
        callback(null, JSON.stringify(body));
    })
}