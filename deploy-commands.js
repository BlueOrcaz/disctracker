const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');


const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // filters out all the files with the exception of files ending in .js

for (const file of commandFiles) {
	const command = require(`./commands/${file}`); // Requires a file name which is the command name.
	commands.push(command.data.toJSON()); // return a command as a string, to then be deployed as the listed name (pong.js is /pong)
}

const rest = new REST({ version: '9' }).setToken(token); // fetch the discord bot token

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.')) 
	.catch(console.error);