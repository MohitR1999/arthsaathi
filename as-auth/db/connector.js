const MySQL = require("./Mysql");

let dbConnectionInstance = null;

const getDbConnectionInstance = () => {
    const host = process.env.MYSQL_HOSTNAME;
    const port = process.env.MYSQL_PORT;
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    if (!dbConnectionInstance) {
        dbConnectionInstance = new MySQL({
            host,
            port,
            user,
            password,
        });
    }
    
    return dbConnectionInstance;
}

module.exports = getDbConnectionInstance;