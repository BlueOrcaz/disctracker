require('dotenv').config();
const fs = require('node:fs'); // Provides a lot of very useful functionality to access and interact with the file system
const { Client, Intents, Collection } = require('discord.js');  // To define Client, Intents, and collection discordjs is required
const { token } = process.env.DISCORD_TOKEN //require('./config.json'); // read config.json to find the discord token
const client = new Client({ intents: [Intents.FLAGS.GUILDS]}); // Enables intents 
const mongoose = require('mongoose');
const User = require('./schemas/UserSchema');





client.commands = new Collection(); // Utility class - holds key value pairs and remembers the original insertion order of the keys. 

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Filters out all other files with the exception of .js files

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}


client.once('ready', () => { 
    console.log(`Logged in as ${client.user.tag}`); // logs to the console when the bot is turned on and ready to go
});



client.on("ready", () => {
	setInterval(() => {
		if(client.guilds.cache.size < 2){
			client.user.setActivity(`${client.guilds.cache.size} Server`, {type: "WATCHING"});
		}
		else {
			client.user.setActivity(`${client.guilds.cache.size} Servers`, {type: "WATCHING"});
		}
	}, 5000);
});


client.on('interactionCreate', async interaction => {
	
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);



	if (!command) return; // if a command is detected then it executes the command
	try {
		await command.execute(interaction); // executes command
		const newUser = await User.create({
			username: interaction.user,
			discordId: interaction.id
		});
		
		const savedUser = await newUser.save();
		setInterval(await newUser.deleteOne(), 5000);
	} catch (error) {
		console.error(error);
		const { MessageEmbed } = require('discord.js');
		const Embed = new MessageEmbed()
		.setColor("RANDOM")
		.setTitle("Error")
		.setDescription("There was an Error exceuting this Command! Please make sure that your account details are set to public and/or you didn't mistype!")
		.setTimestamp()
		await interaction.reply({ embeds: [Embed] });

		// await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); // logs an error 
	}
});

mongoose.connect(process.env.MONGODB_SRV, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=>{
	console.log("Connected to the Database");
}).catch((err) =>{
	console.log(err);
});


	


client.on('shardError', error => {
	console.error("A websocket connection encountered an error:", error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});




client.login(token);