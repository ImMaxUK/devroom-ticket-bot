const { errorEmbed } = require('../utils/embeds')
const { ccommands } = require('../handlers/client');
const { client } = require('../handlers/client');

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = ccommands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ embeds: [errorEmbed('','There was an error executing this command!')], ephemeral: true });
    }
});