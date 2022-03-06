const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { primaryEmbed, errorEmbed } = require('../../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Send the ticket creation menu'),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ embeds: [errorEmbed('', 'You need the permission `ADMINISTRATOR` to use this command!')], ephemeral: true });

        interaction.channel.send({
            embeds: [primaryEmbed('Ticket Creation', 'Welcome to the Ticket Creation menu!\n\nPlease press the button below to open a ticket and receive support from one of the members of our team.')],
            components: [
                new discord.MessageActionRow()
                    .addComponents(
                        new discord.MessageButton()
                            .setCustomId('open-ticket')
                            .setLabel('Ticket')
                            .setEmoji('🎟️')
                            .setStyle('PRIMARY'),
                    )
            ]
        })

        interaction.reply({ content: 'Menu sent successfully!', ephemeral: true });
    }
}