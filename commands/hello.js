const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Replies with a welcome message'),
	async execute(interaction) {
		const message = await interaction.reply({content: 'Hello, I am DiscTracker, a bot that can track your statistics!', fetchReply: true});
        message.react('👋');
	},
};