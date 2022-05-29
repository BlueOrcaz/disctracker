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
    // try { 

    
    const user = interaction.options.get("steamuser").value;
    //   const user = interaction.options.getString("string", false);
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(process.env.STEAM_KEY);
    
    if (isNaN(user)) { // if user is not a number
        steam.resolve(`https://steamcommunity.com/id/${user}`).then(id => {
            steam.getUserLevel(id).then(lvl => {
            steam.getUserSummary(id).then(summary => { 
            steam.getUserRecentGames(id).then(recentgames => {
            steam.getUserBans(id).then(bans => {
            steam.getUserGroups(id).then(groups => {
            steam.getUserOwnedGames(id).then(ownedgames => {
        //   console.log(id); debug
        //   console.log(JSON.stringify()); debug
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
         //  console.log(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY}&steamids=${steamresolve.then((response) => response.json()).then((user) => { user.})}`);
       
           interaction.reply({ embeds: [Embed]});
    
           return id, summary, lvl, recentgames, bans, groups, ownedgames;
        
        })
        })
        })
        })
        })
        })
        });
    }

    else if (!isNaN(user)) {
        const { MessageEmbed } = require('discord.js');
        steam.getUserSummary(user).then(summary => {
        steam.getUserLevel(user).then(lvl => {
        steam.getUserRecentGames(user).then(recentgames => {
        steam.getUserBans(user).then(bans => {    
        steam.getUserGroups(user).then(groups => {
        steam.getUserOwnedGames(user).then(ownedgames => {
        console.log(JSON.stringify(recentgames));


        

        
        const Embed = new MessageEmbed()
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
        interaction.reply({embeds: [Embed]});
        return summary, lvl, recentgames, bans, groups, ownedgames;
    })
    })
    })
    })
    })
    })
    }
/* } catch (error) {
    console.error(error);
} */
    }, 

    }


     


