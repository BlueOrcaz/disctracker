const { SlashCommandBuilder } = require('@discordjs/builders');
const { fs } = require('fs');


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

    steam.resolve(`https://steamcommunity.com/id/${user}`).then(summary => {
        console.log(summary);
    })
    
	},
};