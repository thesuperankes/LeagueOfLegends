class ChampionMaestries{
    constructor(playerId,
                championId,
                championLevel,
                championPoints,
                lastPlayTime,
                championPointsSinceLastLevel,
                championPointsUntilNextLevel,
                chestGranted,
                tokensEarned){
        this.playerId = playerId;
        this.championId = championId;
        this.championPoints = championPoints;
        this.lastPlayTime = lastPlayTime;
        this.championPointsSinceLastLevel = championPointsSinceLastLevel;
        this.championPointsUntilNextLevel = championPointsUntilNextLevel;
        this.chestGranted = chestGranted;
        this.tokensEarned = tokensEarned;
    }
}

module.exports = ChampionMaestries;