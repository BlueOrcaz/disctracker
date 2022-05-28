const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('userstats')
		.setDescription('replies with your discord stats')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Put Discord username in here to check user stats')
                .setRequired(true) 
            ),
                
        
	async execute(interaction) { 
       
        const u = interaction.options.getUser("user", true) || interaction.user;
        const g = interaction.options.getMember("user", true) || interaction.guild;

        
        // at the top of your file
        const { MessageEmbed } = require('discord.js');
        // inside a command, event listener, etc.
        const Embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Discord User Statistics')
        //  .setURL('https://discord.js.org/')
            .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
            .setDescription(`Discord user statistics for ${interaction.options.getUser("user", true)}`)
            .setThumbnail(u.displayAvatarURL({dynamic: true}))
            .addFields(
                { name: 'Username and Tag:', value:` ${u.tag}`},
                { name: 'Registration Date:', value:`<t:${Math.round(u.createdTimestamp / 1000)}:R>`},
                { name: 'Server Join Date:', value: ` <t:${Math.round(g.joinedTimestamp / 1000)}:R>`},
                
                
            //    { name: '\u200B', value: '\u200B' },
            //    { name: 'Inline field title', value: 'Some value here', inline: true },
            //    { name: 'Inline field title', value: 'Some value here', inline: true },
            ) 

        //    .addField('Inline field title', 'Some value here', true) 

            .setTimestamp()
        //  .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        

            await interaction.reply({ embeds: [Embed] });
        //  interaction.followUp("Hi");
	},
};