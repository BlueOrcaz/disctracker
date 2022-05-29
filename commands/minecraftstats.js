const { SlashCommandBuilder } = require('@discordjs/builders');
const { fs } = require('fs');


module.exports = {

    name: "mcskin",
    category: "accounts",
    description: "accounts",
    usage: "mcskin <playername>",
    
	data: new SlashCommandBuilder()
		.setName('minecraftstats')
		.setDescription('replies with your discord stats')
        .addStringOption(option => 
            option
                .setName('mcuser')
                .setDescription('Put Minecraft: Java Edition username in here to check user stats')
                .setRequired(true) 
            ),
                
        
	async execute(interaction) { 
    
    const user = interaction.options.get("mcuser").value;
    //   const user = interaction.options.getString("string", false);
    var mcapi = require("mcapi");
    let uuid = await mcapi.usernameToUUID(user);
    
    const { MessageEmbed } = require('discord.js');
    const Embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Minecraft User Statistics')
        .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
        .setDescription(`Minecraft user statistics for ${user}`)
        .setThumbnail(`https://minotar.net/bust/${user}/100.png`)
        .addFields(
            { name: 'Username:', value: `${user}`},
            { name: 'UUID:', value: `${uuid}`},
            { name: 'Skin:', value: `[Download](https://minotar.net/download/${user})`},
            { name: 'More Info:', value:`[NameMC](https://mine.ly/${user}.1)`},
        )
        .setTimestamp()
        await interaction.reply({ embeds: [Embed] });
    }, catch (e) {
        interaction.reply(e);
    }
};