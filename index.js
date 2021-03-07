// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();
const db = require("quick.db");
const strike = new db.table("strike");

const token = "token";
const prefix = 's!';

client.on('ready', () => {
  client.user.setActivity(prefix + 'help')
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return
  const [command, ...args] = message.content.slice(prefix.length).split(' ')

  switch (command) {

    case "strike":
      if (message.author.id === "あなたのユーザーID") {

        if (args[0] === "add") {

          const atid = args[1]
          const level = args[2]
          const atuser = client.users.cache.get(atid).tag

          strike.add(atid, level)
          const resultlevel = await strike.get(atid)

          if (resultlevel < 50) {
            var korb = "Kick";
            var remaining = "`" + (80 - resultlevel) + "`ポイント";
            var limit = "まであと";
            var color = "GREEN"
          } else if (50 <= resultlevel < 80) {
            var korb = "Kick";
            var remaining = "`" + (80 - resultlevel) + "`ポイント";
            var limit = "まであと";
            var color = "YELLOW"
          } else if (resultlevel == 80) {
            var korb = "80ポイントのため、" + atuser + "はルールに則り**Kick**されます。";
            var remaining = "";
            var limit = ""
            var color = "RED"
          } else if (80 < resultlevel < 100) {
            var korb = "Ban";
            var remaining = "`" + (100 - resultlevel) + "`ポイント";
            var limit = "まであと";
            var color = "YELLOW"
          } else if (resultlevel >= 100) {
            var korb = "100ポイントに達しているため、" + atuser + "はルールに則り**Ban**されます。";
            var remaining = "";
            var limit = "";
            var color = "RED"
          } 

          const embed = new discord.MessageEmbed()
            .setTitle("ルール違反ポイント付与")
            .setDescription("`" + atuser + "`に**ルール違反ポイント**を付与しました。")
            .addField("付与ポイント", level, true)
            .addField("現在のポイント", resultlevel, true)
            .addField("KickまたはBanまでのリミット", korb + limit + remaining)
            .setColor(color)
            .setTimestamp()

          message.channel.send(message.author, embed);

        } else if (args[0] === "check") {

          const atid = args[1]
          const atuser = client.users.cache.get(atid).tag

          const resultlevel = await strike.get(atid)

          if (resultlevel < 50) {
            var korb = "Kick";
            var remaining = "`" + (80 - resultlevel) + "`ポイント";
            var limit = "まであと";
            var color = "GREEN"
          } else if (50 <= resultlevel < 80) {
            var korb = "Kick";
            var remaining = "`" + (80 - resultlevel) + "`ポイント";
            var limit = "まであと";
            var color = "YELLOW"
          } else if (resultlevel == 80) {
            var korb = "80ポイントのため、" + atuser + "はルールに則り**Kick**されます。";
            var remaining = "";
            var limit = ""
            var color = "RED"
          } else if (80 < resultlevel < 100) {
            var korb = "Ban";
            var remaining = "`" + (100 - resultlevel) + "`ポイント";
            var limit = "まであと";
            var color = "YELLOW"
          } else if (resultlevel >= 100) {
            var korb = "100ポイントに達しているため、" + atuser + "はルールに則り**Ban**されます。";
            var remaining = "";
            var limit = "";
            var color = "RED"
          }

          const embed = new discord.MessageEmbed()
            .setTitle("ルール違反ポイント確認")
            .setDescription("`" + atuser + "`の**ルール違反ポイント**を表示しています。")
            .addField("現在のポイント", resultlevel, true)
            .addField("KickまたはBanまでのリミット", korb + limit + remaining)
            .setColor(color)
            .setTimestamp()
          message.channel.send(message.author, embed);

        } else message.reply("引数を確認してね！")
      }
  }
});
client.login(token);
