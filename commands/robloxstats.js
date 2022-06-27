const { SlashCommandBuilder } = require('@discordjs/builders');
const { time } = require('console');
const axios = require('axios').default;


module.exports = {
    
	data: new SlashCommandBuilder()
		.setName('robloxstats')
		.setDescription('Checks your roblox statistics!')
        .addStringOption(option => 
            option
                .setName('username')
                .setDescription('Put your roblox id here to check the users statistics')
                .setRequired(true) 
            ),
    
	async execute(interaction) {
        
        
        const user = interaction.options.get("username").value;




        
        axios.get(`https://users.roblox.com/v1/users/${user}`)
            .then(function (response) {    
                axios.get(`https://thumbnails.roblox.com/v1/users/avatar-bust?userIds=${user}&size=420x420&format=Png&isCircular=false`)
                    .then(function (thumb) { 
                    console.log(thumb.data)
                    
                
            // debug: console.log(response.data); 
                const date = new Date(response.data.created);            
                const { MessageEmbed } = require('discord.js');
                const Embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Roblox User Statistics")
                    .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
                    .setDescription(`Roblox User Statistics for ${response.data.name}`)
                //    .setThumbnail(thumbnail.data[2].imageUrl)
                    .addFields(
                        { name: 'Username:', value: `${response.data.name}` },
                        { name: 'DisplayName:', value: `${response.data.displayName}` },
                        { name: 'Ban Status:', value: `${response.data.isBanned }` },
                        { name: 'Register Date:', value: `<t:${Math.floor(date / 1000)}:R>` },
                        { name: 'Profile Description:', value: `"${response.data.description}"` },
                        { name: 'UserId', value: `${response.data.id}` }
                    )
                .setTimestamp()
                interaction.reply({ embeds: [Embed]});
                return response, thumb;       
            })
        })
            .catch(function (error) {
                console.log(error);
            });
        


		// await interaction.reply('ping');
        // Team_49 Roblox ID: 305274882
	},
};