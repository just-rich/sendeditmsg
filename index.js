require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Command to send a message in a channel (not in a thread)
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const args = message.content.split(/ +/);
    const command = args.shift().toLowerCase();

    // Command to send message in a channel
    if (command === '!sendmsg') {
        const channelMention = args.shift();
        const msgContent = args.join(' ').replace(/(^"|"$)/g, ''); // Remove surrounding quotes

        // Extract channel ID from mention
        const channelId = channelMention.replace(/[<#>]/g, '');
        const channel = await client.channels.fetch(channelId).catch(() => null);

        if (!channel || channel.type !== ChannelType.GuildText) {
            return message.reply('Invalid channel.');
        }

        // Send message to the channel
        const sentMessage = await channel.send(msgContent);
        message.reply(`Message sent in channel: ${channel.name} (ID: ${sentMessage.id})`);
    }

    // Command to send a message in a specific thread
    else if (command === '!sendthreadmsg') {
        const threadMention = args.shift();
        const msgContent = args.join(' ').replace(/(^"|"$)/g, ''); // Remove surrounding quotes

        // Extract thread ID from mention
        const threadId = threadMention.replace(/[<#>]/g, '');
        const thread = await client.channels.fetch(threadId).catch(() => null);

        if (!thread || ![ChannelType.PublicThread, ChannelType.PrivateThread].includes(thread.type)) {
            return message.reply('Invalid or non-existent thread.');
        }

        // Send message to the thread
        const sentMessage = await thread.send(msgContent);
        message.reply(`Message sent in thread: ${thread.name} (ID: ${sentMessage.id})`);
    }

    // Command to edit a message
    else if (command === '!editmsg') {
        const messageId = args.shift();
        const newContent = args.join(' ').replace(/(^"|"$)/g, '');

        if (!messageId || !newContent) {
            return message.reply('Usage: `!editmsg <message ID> "new message"`');
        }

        try {
            // Fetch message by ID
            const fetchedMessage = await message.channel.messages.fetch(messageId);

            if (!fetchedMessage) return message.reply('Message not found.');

            if (fetchedMessage.author.id !== client.user.id) {
                return message.reply('I can only edit messages I sent.');
            }

            // Edit message
            await fetchedMessage.edit(newContent);
            message.reply(`Message edited successfully.`);
        } catch (error) {
            message.reply('Error: Could not edit the message. Make sure the ID is correct.');
        }
    }
});

client.login(process.env.TOKEN);