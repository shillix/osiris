const Command = require("../../structures/Command");

class Fitta extends Command {
    constructor() {
        super();
        this.config = {
            name: "fitta",
            category: "generic",
            cooldown: 60,
        }
        this.extra = {
            perms: []
        }
    }
    async run(Osiris, msg, args) {
        msg.channel.createMessage("testing testing")
    }
}
module.exports = new Fitta;