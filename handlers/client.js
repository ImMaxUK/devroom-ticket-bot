const discord = require('discord.js');
const client = new discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});
const { log } = require('../utils/log');
require('dotenv').config({ path: './.env' });

const fs = require('fs');
const ccommands = new discord.Collection();

// Load all slash commands
log.info('> Loading Slash Commands...');

var scommands = [];
(function readdir(path = './commands') {
    const allCommands = fs.readdirSync(path);
    for (const command of allCommands) {
        if (fs.statSync(`${path}/${command}`).isDirectory()) {
            readdir(`${path}/${command}`);
            continue;
        }
        try {
            const loadedCommand = require(`.${path}/${command}`);
            scommands.push(loadedCommand.data.toJSON());
            ccommands.set(loadedCommand.data.name, loadedCommand);

            log.info(`>> Loaded command ${loadedCommand.data.name} (${path}/${command})`);
        } catch (error) {
            log.error(`Failed to load command ${path}/${command}. **Please report the following error:**`);
            log.error(error);
        }
    }
})();

client.login(process.env.TOKEN);
client.on('ready', async () => { log.info(`🤖 Logged in as ${client.user.tag}!`); });

module.exports.scommands = scommands;
module.exports.ccommands = ccommands;
module.exports.client = client;