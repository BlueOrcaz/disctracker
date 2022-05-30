const { SlashCommandBuilder, EmbedAssertions } = require('@discordjs/builders');
require('dotenv').config();


module.exports = {   
	data: new SlashCommandBuilder()
		.setName('steamstats')
		.setDescription('replies with your steam account stats')
        .addStringOption(option => 
            option
                .setName('steamuser')
                .setDescription('Put your SteamID to check your stats! Profile must be on public')
                .setRequired(true) 
            ),
                
        
	async execute(interaction) { 
        const user = interaction.options.get("steamuser").value;
        const SteamAPI = require('steamapi');
        const steam = new SteamAPI(process.env.STEAM_KEY);
        let id;
        let lvl;
        let summary;
        let recentgames;
        let bans;
        let groups;
        let ownedgames;

        async function messageSend() {
            if(isNaN(user)) {
                id = await steam.resolve(`https://steamcommunity.com/id/${user}`);
                summary = await steam.getUserSummary(id);
                lvl = await steam.getUserLevel(id);
                recentgames = await steam.getUserRecentGames(id);
                bans = await steam.getUserBans(id);
                groups = await steam.getUserGroups(id);
                ownedgames = await steam.getUserOwnedGames(id);
            }
            else if(!isNaN(user)) {
                summary = await steam.getUserSummary(user);
                lvl = await steam.getUserLevel(user);
                recentgames = await steam.getUserRecentGames(user);
                bans = await steam.getUserBans(user);
                groups = await steam.getUserGroups(user);
                ownedgames = await steam.getUserOwnedGames(user);
            }
            console.log(id);
            console.log(summary)
            console.log(lvl)
            console.log(recentgames)
            console.log(bans)
            console.log(groups)
            console.log(ownedgames)
        }
        messageSend();
    }, 

    }


     


