# Send/Edit Message

This project is a Discord bot that supports multiple shards using Discord.js. The bot can send messages in channels, send messages in threads, and edit messages.

## Features
- Supports **Discord.js ShardingManager** to handle large bots efficiently. *(Optional)*
- Commands to send messages in channels and threads.
- Ability to edit messages sent by the bot.
- Automatically determines the number of shards needed.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/just-rich/sendeditmsg.git
   cd sendeditmsg
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file or rename `.env.example` to it** in the root directory and add your bot token:
   ```env
   TOKEN=discord_bot_token_here
   ```

## Running the Bot

To start the bot **without** sharding, use:
```bash
node index.js
```

To start the bot **with** sharding, use:
```bash
node shard.js
```

## File Structure
```
/
├── index.js      # Main bot code
├── shard.js    # Sharding manager
├── .env        # Environment variables
├── package.json # Node dependencies
└── README.md   # Documentation
```

## Commands
- `!sendmsg <#channel> "message"` - Sends a message in the specified channel.
- `!sendthreadmsg <#thread> "message"` - Sends a message in a specific thread.
- `!editmsg <messageID> "new message"` - Edits a previously sent message by the bot.

## Notes
- Ensure the bot has **permissions** to send and edit messages in the channels/threads.
- Run `node shard.js` instead of `node bot.js` to enable sharding.
- If you encounter any issues, check your bot's token and permissions.

## License
This project is open-source and available under the MIT [License](LICENSE).

---

slapped together by [rich](https://richw.xyz) for [NVSTly](https://nvstly.com)'s Discord [bot](https://nvstly.com/go/bot) temporarily.
