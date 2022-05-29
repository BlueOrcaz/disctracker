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
                .setDescription('Put your steam community ID to check your stats')
                .setRequired(true) 
            ),
                
        
	async execute(interaction) { 
    
    const user = interaction.options.get("steamuser").value;
    //   const user = interaction.options.getString("string", false);
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(process.env.STEAM_KEY);

    const { MessageEmbed } = require('discord.js');

    const Embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Steam User Statistics')
        .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
        .setDescription(`Steam user statistics for ${interaction.options.get("steamuser", true)}`)
    console.log(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY}&steamids=${steam.resolve(`https://steamcommunity.com/id/${user}`).then(summary => { console.log(summary)})}`);

    await interaction.reply({ embeds: [Embed]});

    steam.resolve(`https://steamcommunity.com/id/${user}`).then(summary => {
        console.log(summary);
    })
    
	},
};