const { scommands } = require('./client');
const { log } = require('../utils/log');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv').config('../.env')

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
(async () => {
    try {
        log.info('> Refreshing application (/) commands...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
            { body: scommands },
        );

        log.info('Successfully refreshed application (/) commands.');
    } catch (error) {
        log.error(error);
    }
})();