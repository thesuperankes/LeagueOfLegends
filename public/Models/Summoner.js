class Summoner{
    constructor(id,
                name,
                summonerLevel,
                accountId,
                profileIconId,
                revisionDate){
        this.id = id;
        this.name = name;
        this.summonerLevel = summonerLevel;
        this.accountId = accountId;
        this.profileIconId = profileIconId;
        this.revisionDate = revisionDate;
    }
}

module.exports = Summoner;