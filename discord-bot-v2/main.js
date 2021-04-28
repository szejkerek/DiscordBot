const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
require('dotenv').config();
const prefix = '$';
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('BOT IS ONLINE!!!');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } 
});


client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	if(reaction.message.author.username === "Bartuś" && reaction.message.author.tag === "Bartuś#8551")
    {
        if(reaction.emoji.name === '5Head')
            {
                reaction.message.reactions.cache.get('837019465212100658').remove().catch(error => console.error('Failed to remove reactions: ', error));

            }
    }

});


client.on('message', message =>{

    if(message.author.bot) return;

    
});
 
client.login(process.env.TOKEN);