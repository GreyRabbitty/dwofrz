import React from "react";
const { roleMention } = require("discord.js");

const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  TextChannel,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
  ],
});

const Nlike_retweet_comment_discord = (data) => {
  let amount = 1;
  let reward = "NFT";

  const channel = client.channels.cache.get(process.env.GUILD_ID);
  const myDate = new Date();
  const myEpoch = myDate.getTime() / 1000.0;
  const time = Math.floor(myEpoch);

  client.on("ready", async () => {
    const channel = client.channels.cache.get(process.env.GUILD_ID);
    let name = data.twitter_handler.replace(/\s/g, "");

    const embed1 = new EmbedBuilder()
      .setColor("#ffaa00")
      .setAuthor({
        name: data.twitter_handler,
        iconURL: data.twitter_profile,
        url: "https://twitter.com/" + name,
      })
      .setURL("https://twitter.com/" + data.name)
      .setTitle(data.name)
      // .setTitle(element.title)
      .setDescription(data.discription)
      // .addFields("**Requirements**", ":")
      // .setThumbnail(client.user.displayAvatarURL())
      .addFields([
        {
          name: "Reward",
          value: String(reward),
          inline: true,
        },
        {
          name: "Feedback",
          value: String(data.bundle),
          inline: true,
        },
        {
          name: "Ends",
          value: `<t:${time + 216000}:R>`,
          inline: true,
        },
      ])
      .addFields([
        {
          name: "Twitter",
          value: String(
            "https://twitter.com/" + data.name + "/status/" + data.twitter_id
          ),
          inline: true,
        },
        {
          name: "Discord",
          value: String(data.discord_url),
          inline: true,
        },

        {
          name: "Ragnarok",
          value: String(
            "https://dworfz-raiding.vercel.app/" + data.name + "/" + data.twitter_id
          ),
          inline: true,
        },
      ])
      .setImage(data.project_image)
      .setTimestamp(Date.now())
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.username,
      });
    channel.send(
      "@everyone " + roleMention("1088821735874367551") + " Hello, everyone!"
    );

    channel.send({ embeds: [embed1] });
    // channel.send({ content: "", components: [row] });
    // });

  });

  client.login(process.env.TOKEN);
};

export { Nlike_retweet_comment_discord };
