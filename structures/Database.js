module.exports = class Database {
    constructor(client) {
        this.client = client;
    }
    async createGuild(guildID) {
        await this.client.r.table("guilds").insert({
            id: guildID, 
            prefix: this.client.config.prefix, 
            disabledCommands: [],
        }).run()
        return this.getGuild(guildID);
    }
    async createUser(UserID) {
        await this.client.r.table("users").insert({
            id: UserID, 
            coins: 0,
            blacklisted: false,
        }).run()
        return this.getUser(UserID);
    }
    async getGuild(guildID) {
        return await this.client.r.table("guilds").get(guildID).run();
    }
    async getUser(userID) {
        return await this.client.r.table("users").get(userID).run();
    }
    async updateUser(userEntry) {
        return this.client.r.table("users").insert(userEntry, { conflict: 'update' }).run()
    }
    async updateGuild(guildEntry) {
        return this.client.r.table("guilds").insert(guildEntry, { conflict: 'update' }).run()
    }

}