module.exports = class Command {
    constructor() { }
    async hasPermission(member) {
        let missingPerms = [];
        if(member.permission.has("administrator")) return true;
        this.extra.perms.forEach(perm => {
            if(!member.permission.has(perm)) {
                missingPerms.push(perm);
            }
        });
        return missingPerms[0] ? false : true;
    }
}