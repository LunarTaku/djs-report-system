const chalk = require("chalk");
const {
  Client,
  CommandInteraction,
  TextInputStyle,
  InteractionType,
  EmbedBuilder,
} = require("discord.js");
const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
} = require("@discordjs/builders");

const { default: mongoose } = require("mongoose");
const reportSchema = require("../../schemas/reportSchema");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (interaction.isUserContextMenuCommand()) {
      if (interaction.commandName === "report") {
        const modal = new ModalBuilder()
          .setCustomId("reportUserModel")
          .setTitle("Report a user!")
          .setComponents(
            new ActionRowBuilder().setComponents(
              new TextInputBuilder()
                .setCustomId("reportMessage")
                .setLabel("Report Message")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMinLength(20)
                .setMaxLength(500)
            )
          );

        await interaction.showModal(modal);
        const modalSubmitInt = await interaction.awaitModalSubmit({
          filter: (i) => {
            return true;
          },
          time: 20000,
        });

        // Send the report to a user chosen channel

        const reportChannelId = await reportSchema.findOne({
          guildId: interaction.guild.id,
        });

        if (!reportChannelId) return;

        client.channels.cache
          .get(reportChannelId.channelId)
          .send({
            embeds: [
              new EmbedBuilder()
              .setTitle(`New Report Received!`)
              .addFields(
                {
                  name: "User Reported",
                  value: `${interaction.targetMember}`,
                  inline: true
                },
                {
                  name: "Reported By",
                  value: `${interaction.member.user.username}`,
                  inline: true
                },
                {
                  name: "Report Reason",
                  value: `\`\`\`${modalSubmitInt.fields.getTextInputValue("reportMessage")}\`\`\``
                }
              )
            ]
          });

        // send the user a confirmation message

        interaction.targetMember.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Report")
              .setDescription(
                `${
                  interaction.member.user
                } has reported you for: ${modalSubmitInt.fields.getTextInputValue(
                  "reportMessage"
                )}`
              )
              .setColor("Red"),
          ],
        }).catch((err) => { 
            interaction.followUp({
                content: `${interaction.targetMember} does not accept dms so none where sent.`
            })
        });

        interaction.followUp({
            content: "Report has been sent to the moderators!",
            ephemeral: true,
            });
      }
    }
  },
};
