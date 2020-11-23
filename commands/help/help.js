import discord from "discord.js";

export default {
    name: "help",
    category: "help",
    description: "Return all commands",
    run: (client, message, args) => { 
        const embed = new discord.MessageEmbed()
        .setColor("RANDOM")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }
    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);
    
    return message.channel.send(embed.setDescription(info));
    }
}