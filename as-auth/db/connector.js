const MySQL = require("./Mysql");

const getDbConnectionInstance = () => {
    const host = process.env.MYSQL_HOSTNAME;
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;

    const mysqlInstance = new MySQL({
        host,
        user,
        password,
        database
    });

    return mysqlInstance;
}

module.exports = getDbConnectionInstance;