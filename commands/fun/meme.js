import discord from "discord.js";
import randomPuppy from "random-puppy";

export default {
    name: "meme",
    category: "fun",
    description: "Sends an epic meme",
    run: async (client, message, args) => {
        // In this array, 
        // you can put the subreddits you want to grab memes from
        const subReddits = ["Memes_Of_The_Dank", "memes", "gank", "DirtyMemes", "NewOffensiveMemes", "MemesIRL", "meme"];
        // Grab a random property from the array
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        // Get a random image from the subreddit page
        const img = await randomPuppy(random);
        const embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
}