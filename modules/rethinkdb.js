const config = require("../config.json")

var r = require('rethinkdbdash')({
    db: config.rethinkdb.db
});
module.exports = r;