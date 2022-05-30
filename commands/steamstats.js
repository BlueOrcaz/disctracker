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

        if(isNaN(user)) {
            const id = steam.resolve(`https://steamcommunity.com/id/${user}`);
            const lvl = steam.getUserLevel(id);
            const summary =  steam.getUserSummary(id);
            const recentgames = steam.getUserRecentGames(id);
            const bans = steam.getUserBans(id);
            const groups = steam.getUserGroups(id);
            const ownedgames = steam.getUserOwnedGames(id);
        }
        else if(!isNan(user)) {
            const lvl = steam.getUserLevel(user);
            const summary =  steam.getUserSummary(user);
            const recentgames = steam.getUserRecentGames(user);
            const bans = steam.getUserBans(user);
            const groups = steam.getUserGroups(user);
            const ownedgames = steam.getUserOwnedGames(user);
        }
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
    }, 

    }


     


