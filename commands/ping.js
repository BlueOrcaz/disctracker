const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const { MessageEmbed } = require('discord.js');
		const Embed = new MessageEmbed()
			.setColor("RANDOM")
			.setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
			.setDescription(`🏓 Pong! Latency is ${Math.abs(Date.now() - interaction.createdTimestamp)} ms`)
			.setTimestamp()
		await interaction.reply({ embeds: [Embed] });
	},
};