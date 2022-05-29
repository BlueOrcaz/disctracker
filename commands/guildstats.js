const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guildstats')
		.setDescription('Replies with the server stats'),
	async execute(interaction) {
        const { MessageEmbed } = require('discord.js');

        const Embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Server Statistics')
            .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
            .setDescription(`Discord server statistics for ${interaction.guild.name}`)
            .setThumbnail(interaction.guild.iconURL({dynmaic: true}))
            .addFields(
                { name: 'Server Name:', value: interaction.guild.name},
                { name: 'Server Owner', value: `${await interaction.guild.fetchOwner()}`},
                { name: 'Creation Date:', value: `<t:${Math.round(interaction.guild.createdTimestamp /1000)}:R>`},
                { name: 'Member Count:', value: `${interaction.guild.memberCount}`}
                
            )
            .setTimestamp()
        
        await interaction.reply({ embeds: [Embed]});
        
	},catch (error) {
        console.error(error);
        interaction.reply("Error"); // logs an error 
    }
};