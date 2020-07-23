const config = require("../config.json")
var Redis = require("ioredis")
const redis = new Redis(config.redis.port, config.redis.host)
module.exports = redis;