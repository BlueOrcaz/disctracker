const { SlashCommandBuilder, EmbedAssertions } = require('@discordjs/builders');
const { fs } = require('fs');
const { measureMemory } = require('vm');
require('dotenv').config();


module.exports = {   
	data: new SlashCommandBuilder()
		.setName('steamstats')
		.setDescription('replies with your steam account stats')
        .addStringOption(option => 
            option
                .setName('steamuser')
                .setDescription('Put your steam community ID (not profile id) to check your stats')
                .setRequired(true) 
            ),
                
        
	async execute(interaction) { 
    
    const user = interaction.options.get("steamuser").value;
    //   const user = interaction.options.getString("string", false);
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(process.env.STEAM_KEY);
    
    
     

    steam.resolve(`https://steamcommunity.com/id/${user}`).then(id => {
        steam.getUserSummary(id).then(summary => { 

        
       console.log(id);
       const { MessageEmbed } = require('discord.js');

       const Embed  = new MessageEmbed()
           .setColor('RANDOM')
           .setTitle('Steam User Statistics')
           .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
           .setDescription(`Steam user statistics for ${summary.nickname}`)
           .setThumbnail(summary.avatar.large)
           .addFields(
               { name: 'Nickname:', value: summary.nickname },
               { name: 'Link:', value: summary.url}
           )
     //  console.log(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY}&steamids=${steamresolve.then((response) => response.json()).then((user) => { user.})}`);
   
       interaction.reply({ embeds: [Embed]});

       return id, summary;
       
    })
    });

    

  



   
	},
};