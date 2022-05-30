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
                function varWithTimeout(action, timeout) {
                    return new Promise(function(resolve, reject) {
                        action.then(resolve, reject);
                        setTimeout(reject, timeout);
                    })
                }
                recentgames = await varWithTimeout(steam.getUserRecentGames(user), 1000);
                summary = await varWithTimeout(steam.getUserSummary(user), 1000);
                lvl = await varWithTimeout(steam.getUserLevel(user), 1000);
                recentgames = await varWithTimeout(steam.getUserRecentGames(user), 1000);
                bans = await varWithTimeout(steam.getUserBans(user), 1000);
                groups = await varWithTimeout(steam.getUserGroups(user), 1000);
                //ownedgames = await varWithTimeout(steam.getUserOwnedGames(user), 1000);
                // summary = await new Promise(function(myResolve, myReject) {
                //     steam.getUserSummary(user).then(myResolve, myReject)
                //     setTimeout(myReject, 1 * 1000)
                // })
                // lvl = await new Promise(function(myResolve, myReject) {
                //     steam.getUserLevel(user).then(myResolve, myReject)
                //     setTimeout(myReject, 1 * 1000)
                // })
                // recentgames = await new Promise(function(myResolve, myReject) {
                //     steam.getUserRecentGames(user).then(myResolve, myReject)
                //     setTimeout(myReject, 1 * 1000)
                // })
                // bans = await new Promise(function(myResolve, myReject) {
                //     steam.getUserBans(user).then(myResolve, myReject)
                //     setTimeout(myReject, 1 * 1000)
                // })
                // groups = await new Promise(function(myResolve, myReject) {
                //     steam.getUserGroups(user).then(myResolve, myReject)
                //     setTimeout(myReject, 1 * 1000)
                // })
                // ownedgames = await new Promise(function(myResolve, myReject) {
                //     steam.getUserOwnedGames(user).then(myResolve, myReject)
                //     setTimeout(myReject, 1 * 1000)
                // })
            }
            // console.log(id);
            // console.log(summary)
            // console.log(lvl)
            // console.log(recentgames)
            // console.log(bans)
            // console.log(groups)
            // console.log(ownedgames)

            const { MessageEmbed } = require('discord.js');
    
           const Embed  = new MessageEmbed()
               .setColor('RANDOM')
               .setTitle('Steam User Statistics')
               .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
               .setDescription(`Steam user statistics for ${summary.nickname}`)
               .setThumbnail(summary.avatar.large)
               .addFields(
                   { name: 'Nickname:', value: summary.nickname },
                   { name: 'Account Creation Date:', value: `<t:${Math.round(summary.createdAt / 1000)}:R>` },
                   { name: 'Account Level:', value: `${lvl}`},
                   { name: 'Number of Games Owned:', value: `${JSON.stringify(ownedgames.length)}`},
                   { name: 'Last Played:', value: `${JSON.stringify(recentgames[0].name)}`},
                   { name: 'Number of VAC Bans:', value: `${JSON.stringify(bans.vacBans)}`},
                   { name: 'Days since last VAC Ban:', value: `${JSON.stringify(bans.daysSinceLastBan)}`},
                   { name: 'Last Online:', value: `<t:${Math.round(summary.lastLogOffAt / 1000)}:R>`},
                   { name: 'Profile Link:', value: summary.url}
                   
               )
               interaction.reply({ embeds: [Embed]});
               return id, summary, lvl, recentgames, bans, groups, ownedgames;
        }
        messageSend();
    }, 

    }


     


