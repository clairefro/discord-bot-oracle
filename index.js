const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config');

// Configure commands
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

bot.commands = new Discord.Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(config.prefix + command.name, command);
}

// Boot bot
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

// Set up command listener
bot.on('message', (message) => {
  // bail if message does not start with command, or was sent by a bot
  // TODO: remove 'startsWith' constraint to allow conversational interaction?
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});
