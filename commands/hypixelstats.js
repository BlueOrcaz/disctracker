const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;


module.exports = {
    
	data: new SlashCommandBuilder()
		.setName('hypixelstats')
		.setDescription('Checks your hypixel stats')
        .addStringOption(option => 
            option
                .setName('username')
                .setDescription('Put your minecraft username or uuid here to look up your stats!')
                .setRequired(true) 
            ),
    
	async execute(interaction) {   
        const user = interaction.options.get("username").value;
        const key = process.env.HYPIXEL_KEY;
        axios.get(`https://api.hypixel.net/player?key=${key}&name=${user}`)
            .then(function (stats) {
                const { MessageEmbed } = require('discord.js');
                const Embed = new MessageEmbed()
                .setColor("RANDOM")
                    .setTitle("Hypixel User Statistics")
                    .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
                    .setDescription(`Hypixel User Statistics for ${stats.data.player.displayname}`)
                    .setThumbnail(`https://pbs.twimg.com/profile_images/1346968969849171970/DdNypQdN_400x400.png`)
                    .addFields(
                        { name: 'Display Name:', value: `${stats.data.player.displayname}` },
                        { name: 'First Login:', value: `<t:${Math.round(stats.data.player.firstLogin / 1000)}:R>` },
                        { name: 'Last Online:', value: `<t:${Math.round(stats.data.player.lastLogin / 1000)}:R>`},
                        { name: 'Previous Usernames', value: `${stats.data.player.knownAliases.join(', ')}` },
                        { name: 'Number of Achievements', value: `${stats.data.player.achievementsOneTime.length}` },
                        { name: 'UUID', value: `${stats.data.player.uuid}` }
                    )
                .setTimestamp()

                
                interaction.reply({ embeds: [Embed]});
            })  
            .catch(function (error) {
                console.log(error);
            });
	},
};

