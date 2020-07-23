const Command = require("../../structures/Command");

class Prefix extends Command {
    constructor() {
        super();
        this.config = {
            name: "prefix"
        }
        this.extra = {
            perms: ["manageGuild"]
        }
    }
    async run(Osiris, msg, args, userEntry, guildEntry) {
        if (!msg.member.permission.has('manageGuild')) {
            return msg.channel.createMessage('You do not have permissions to use this command. ')
        }
        let prefix = args[0];
        guildEntry.prefix = prefix;
        await Osiris.db.updateGuild(guildEntry);
        msg.channel.createMessage("updated prefix")
    }
}
module.exports = new Prefix;