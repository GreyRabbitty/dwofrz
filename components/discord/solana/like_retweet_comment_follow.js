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

const Like_retweet_comment_follow = (donne) => {
  const participated = donne.claimers;
  client.login(process.env.TOKEN);
  let reward = "Solana";
  let amount = donne.amount;
  const channel = client.channels.cache.get(process.env.GUILD_ID);
  const myDate = new Date();
  const myEpoch = myDate.getTime() / 1000.0;
  const time = Math.floor(myEpoch);

  client.on("ready", async () => {
    const channel = client.channels.cache.get(process.env.GUILD_ID);
    let name = donne.twitter_handler.replace(/\s/g, "");

    const embed = new EmbedBuilder()

      .setColor("#ffaa00")
      .setAuthor({
        name: donne.twitter_handler,
        iconURL: donne.twitter_profile,
        url: "https://twitter.com/" + name,
      })
      .setURL("https://twitter.com/" + donne.name)
      .setTitle(donne.name)
      // .setTitle(element.title)
      .setDescription(donne.discription)
      // .addFields("**Requirements**", ":")
      // .setThumbnail(client.user.displayAvatarURL())

      .addFields([
        {
          name: "Reward",
          value: String(reward),
          inline: true,
        },
        {
          name: "Amount",
          value: String(amount),
          inline: true,
        },
        {
          name: "Participated",
          value: String(participated),
          inline: true,
        },
        {
          name: "Feedback",
          value: String(donne.bundle),
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
            "https://twitter.com/" + donne.name + "/status/" + donne.twitter_id
          ),
          inline: true,
        },
        {
          name: "Ragnarok",
          value: String(
            "https://dworfz-raiding.vercel.app/" + donne.name + "/" + donne.twitter_id
          ),
          inline: true,
        },
      ])
      .setImage(donne.project_image)
      .setTimestamp(Date.now())
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.username,
      });

    /* const embed1 = new EmbedBuilder()
            .setAuthor({ 
              name: donne.twitter_handler,
              iconURL: donne.twitter_profile,
              url: "https://twitter.com/" + donne.twitter_handler,
            })
            .setURL(donne.discord_url)
            .setTitle(donne.name)
            // .setTitle(element.title)
            .setDescription(donne.discription)
            // .addFields("**Requirements**", ":")
            // .setThumbnail(client.user.displayAvatarURL())
            .addFields([
              {
                name: "Reward",
                value: String(reward),
                inline: true,
              },
              {
                name: "Ends",
                value: `<t:${time + day * 2.5}:R>`,
                inline: true,
              },
            ])
            .setImage(donne.project_image)
            .setTimestamp(Date.now())
            .setFooter({
              iconURL: client.user.displayAvatarURL(),
              text: client.user.username,
            }); */
    channel.send(
      "@everyone " + roleMention("1088821735874367551") + " Hello, everyone!"
    );
    // channel.send(roleMention("1088821735874367551"));

    channel.send({ embeds: [embed] });
    // channel.send({ content: "", components: [row] });
    // });
  });
};
export { Like_retweet_comment_follow };
