import discord from "discord.js";

export default {
    name: "quote",
    aliases: ["q"],
    category: "quote",
    description: "Adds a quote to the quote channel",
    usage: "<input>",
    run: (client, message, args) => {
        message.delete();

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new discord.MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);

            client.channels.get('727678740217462854').send(embed);
        } else {
            client.channels.get('727678740217462854').send(args.join(" "));
        }
    }
}