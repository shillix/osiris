const Sharder = require("eris-sharder").Master;
const config = require("./config.json");
var r = require("./modules/rethinkdb")
let sharder = new Sharder(config.bot.token, "/class.js", {
	name: "osiris",
	stats: true,
	shards: 1,
	clusters: 1,
})
sharder.on("stats", stats => r.table("stats").insert({id: 0, stats: stats}).run())