const Database = require("./Database");

class MockDatabase extends Database {
    constructor(options) {
        super(options);
        this.options = options;
        this.database = [];
    }

    create = async (user) => {
        this.database.push(user);    
        return true;
    }

    getById = async () => {

    }

    getAll = async () => {

    }

    update = async () => {

    }

    remove = async () => {

    }
}

module.exports = MockDatabase;