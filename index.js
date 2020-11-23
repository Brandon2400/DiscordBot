import { default as discord } from "discord.js";

const client = new discord.Client({
    disableEveryone: true,
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

// config({
//     path: __dirname + "/.env"
// });

["command"].forEach(async (handler) => {
    let module = await import(`./handler/${handler}.js`);
    module.default(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "to Ket Donk",
            type: "RAVING",
        },
    });
});

client.on("message", async (message) => {
    const prefix = "oi";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member)
        message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, message, args);
});

const mainCategory = "719700130600583380";
const connectChannel = "736940747458084924";
client.on("voiceStateUpdate", async (oldState, newState) => {
	if (newState.channelID != connectChannel) {
		return
	}

	var member = newState.member
	var channel = await newState.guild.channels.create(`${member.user.username}'s Private Channel`, {
		type                 : "voice",
		parent               : mainCategory,
		permissionOverwrites : [
			{
				id    : member.user.id,
				allow : [ "CONNECT", "MOVE_MEMBERS", "VIEW_CHANNEL" ],
			},
			{
				id   : newState.guild.id,
				deny : [ "CONNECT" ],
			},
		],
	})
	newState.guild.channels.create(`${member.user.username}'s Waiting Room`, {
		type                 : "voice",
		parent               : mainCategory,
		permissionOverwrites : [
			{
				id    : member.user.id,
				allow : [ "MOVE_MEMBERS" ],
			},
		],
	})

	member.voice.setChannel(channel.id)
})

client.on("voiceStateUpdate", async (oldState, newState) => {
	if (!oldState.channel) {
		return
	}

	if (oldState.channelID == connectChannel) {
		return
	}

	if (oldState.channel.parentID != mainCategory) {
		return
	}

	var channelID = oldState.channelID
	var mainChannel = newState.guild.channels.cache.get(channelID)
	if (mainChannel.name.endsWith("'s Waiting Room") || mainChannel.members.size > 0) {
		return
	}

	var waitingChannelName = mainChannel.name.replace("'s Private Channel", "") + "'s Waiting Room"
	var waitingChannel = newState.guild.channels.cache.find(channel => channel.name == waitingChannelName)

	mainChannel.delete()
	waitingChannel.delete()
})

client.login("Njk1MDUzNDY2NDI2NjcxMjM0.XoU7tw.59h5OKVO0LwnHK8OTOrv5cZD-Zw");