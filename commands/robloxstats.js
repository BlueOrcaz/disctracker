const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;


module.exports = {
    
	data: new SlashCommandBuilder()
		.setName('robloxstats')
		.setDescription('Checks your roblox statistics!')
        .addStringOption(option => 
            option
                .setName('username')
                .setDescription('Put Roblox Username here to check the users statistics')
                .setRequired(true) 
            ),
    
	async execute(interaction) {
        
        
        const user = interaction.options.get("username").value;

        axios.get(`https://thumbnails.roblox.com/v1/users/avatar-bust?userIds=${user}&size=420x420&format=Png&isCircular=false`)
            .then(function (response) { 
                console.log(response.data)
            })


        
        axios.get(`https://users.roblox.com/v1/users/${user}`)
            .then(function (response) {     
            // debug: console.log(response.data); 
                const { MessageEmbed } = require('discord.js');
                const Embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Roblox User Statistics")
                    .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
                    .setDescription(`Roblox User Statistics for UserId ${user}`)
                //    .setThumbnail(thumbnail.data[2].imageUrl)
                    .addFields(
                        { name: 'Username', value: `${response.data.name}` },
                        { name: 'DisplayName', value: `${response.data.displayName}` },
                        { name: 'Banned:', value: `${response.data.isBanned }` },
                        { name: 'Register Date:', value: `${response.data.created }` },
                        { name: 'Profile Description:', value: `${response.data.description}` },
                        { name: 'UserId', value: `${response.data.id}` }
                    )
                .setTimestamp()
                interaction.reply({ embeds: [Embed]});
                return response;       
            })
            .catch(function (error) {
                console.log(error);
            });
        


		// await interaction.reply('ping');
        // Team_49 Roblox ID: 305274882
	},
};