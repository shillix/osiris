module.exports = async function messageCreate(bot, msg, userEntry, guildEntry) {
    if(!msg.content.toLowerCase().startsWith(guildEntry.prefix) || msg.author.bot ) return;
    let [command, ...args] = msg.content.slice(guildEntry.prefix.length).trim().split(" ");

    if (bot.aliases.has(command)) {
        command = bot.aliases.get(command);
    }

    if (!bot.commands.has(command)) return;

    try {
        command = await bot.commands.get(command);
        if(command.config.cooldown) {
            let cooldown = await bot.redis.ttl(`osiris.user.${msg.author.id}.cooldowns.${command.category}.${command.name}`);
            if(cooldown > 0) return msg.channel.createMessage(`Wait for ${cooldown} seconds to use this command again.`)
            await bot.redis.setex(`osiris.user.${msg.author.id}.cooldowns.${command.category}.${command.name }`, command.config.cooldown, 1)
        }
        await command.run(bot, msg, args, userEntry, guildEntry);
    } catch(err) {
        console.log(err);
    }
}   