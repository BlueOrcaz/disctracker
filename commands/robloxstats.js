// does not function at the moment (going to use restapi)

const { SlashCommandBuilder } = require('@discordjs/builders');
const { request } = require('undici');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('robloxstats')
		.setDescription('Put your Roblox Username to check your stats!')
        .addStringOption(option => 
            option
                .setName('robloxuser')
                .setDescription('Put your Roblox Username to check your stats!')
                .setRequired(false)
            
        ),
	async execute(interaction) {
        
        async function getJSONResponse(body) {
            let fullBody = '';
        
            for await (const data of body) {
                fullBody += data.toString();
            }
        
            return JSON.parse(fullBody);
        }
        
        
        const user = interaction.options.get("robloxuser").value;
        console.log(user);
    
    //    const catResult = await request('https://aws.random.cat/meow');
    //    const { file } = await getJSONResponse(catResult.body);
    //   const convertinfo = await request(`https://api.roblox.com/users/get-by-username?username=${user}`);
    //   const { file } = await getJSONResponse(convertinfo.body);
    //    console.log(file);
    

    console.log(fetch('https://api.roblox.com/users/get-by-username?username=Team_49'));
    
    
       

        const { MessageEmbed } = require('discord.js');
        const Embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Roblox User Statistics')
            .setAuthor({ name: 'DiscTracker#5743', iconURL: 'https://i.imgur.com/063Nm4O.png' /*, url: 'https://discord.js.org' */ })
            .setDescription(`Roblox user statistics for ${user}`)
            .setThumbnail(``)
        
        
      //  await interaction.reply('ping');
	},
};