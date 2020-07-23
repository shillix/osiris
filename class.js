const Base = require("eris-sharder").Base;
const Database = require("./structures/Database")
const { readdirSync } = require("fs");
var r = require("./modules/rethinkdb")
const { Collection } = require("eris");
const messageCreate = require("./events/messageCreate")

module.exports = class Osiris extends Base {
	constructor(bot) {
		super(bot);
		this.commands = new Collection();
		this.aliases = new Collection();
		this.r = r;
		this.db = new Database(this);
		this.redis = require("./modules/redis");
		this.config = require("./config.json");
		this.bot.on("messageCreate", async(msg) => {
			var guildEntry = await this.db.getGuild(msg.channel.guild.id) || await this.db.createGuild(msg.channel.guild.id);
			var userEntry = await this.db.getUser(msg.author.id) || await this.db.createUser(msg.author.id);
			messageCreate(this, msg, userEntry, guildEntry);
		})
		this.bot.on("ready", () => {

		})
    }
	launch() {
		console.log("launched bot");
		this.loadCommands();
		this.bot.shards.forEach(s => {
			s.editStatus("online", {
				name: `test status, shard ${s.id}`
			});
		});
	}
	loadCommands() {
		let totalCommands = 0;
		readdirSync("./commands/").forEach(dir => {
			readdirSync(`./commands/${dir}/`).forEach(file => {
				const command = require(`./commands/${dir}/${file}`);
				if(!command.config || !command.config.name) console.log(`command ${dir}/${file}: missing configs`)
				try {
					this.commands.set(command.config.name, command)
					totalCommands += 1;
					console.log(`loaded command ${dir}/${command.config.name}`);
					if(command.config.aliases) command.config.aliases.forEach(alias => this.aliases.set(alias, command.name));
				} catch(e) {
					console.log(`failed to load command ${dir}/${file}: ` + e)
				}
			})
		})
		console.log(`loaded ${totalCommands}/${this.commands.size} commands`)
	}

}