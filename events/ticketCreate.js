const { primaryEmbed, errorEmbed } = require('../utils/embeds')
const { client } = require('../handlers/client');
require('dotenv').config({ path: '../.env' });
const discord = require('discord.js')

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId == "open-ticket") {
        let ticketNumber = Math.floor(Math.random() * 9999);
        const channel = await interaction.message.guild.channels.create(`ticket-${ticketNumber}`, {
            type: 'text',
            topic: `**Ticket - ${interaction.user.tag}** (${interaction.user.id}) | **ID:** ${ticketNumber}`,
            parent: process.env.TICKETCATEGORYID,
            permissionOverwrites: [
                {
                    id: interaction.message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL'],
                    deny: ['SEND_MESSAGES'],
                },
                {
                    id: process.env.STAFFROLEID,
                    allow: ['VIEW_CHANNEL'],
                }
            ]
        })
        if (process.env.PINGONCREATION == 'true') channel.send(`${interaction.user}`);
        interaction.reply({
            embeds: [primaryEmbed('', 'Your ticket has been created! Use the button below to open the channel.')],
            components: [
                new discord.MessageActionRow()
                    .addComponents(
                        new discord.MessageButton()
                            .setLabel('Ticket')
                            .setURL(`https://discordapp.com/channels/${interaction.message.guild.id}/${channel.id}`)
                            .setStyle('LINK'),
                    )
            ],
            ephemeral: true
        });

        channel.send({
            embeds: [primaryEmbed('Welcome to your ticket!', `Hi, ${interaction.user}! :wave:\n\nPlease describe your issue below and a member of the team will get back to you as soon as possible.`).setFooter({ text: 'Please refrain from pinging staff members in a ticket!'})]
        })
    }
});