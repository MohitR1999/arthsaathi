const Database = require("./Database");
const User = require("../models/User");

class MockDatabase extends Database {
    constructor(options) {
        super(options);
        this.options = options;
        this.database = [];
        this.database.push(new User({
            firstName: "Test",
            lastName: "Test",
            email: "test@xyz.com",
            password: "test456",
            id: "5678"
        }))
    }

    create = async (user) => {
        this.database.push(user);
        return true;
    }

    getById = async (id) => {
        const user = this.database.find(user => user.id == id);
        return user;
    }

    getAll = async () => {
        return this.database;
    }

    update = async (user) => {
        for (let i = 0; i < this.database.length; i++) {
            if (this.database[i].id == user.id) {
                this.database[i] = user;
                return true;
            }
        }
    }

    remove = async (id) => {
        const index = this.database.findIndex(user => user.id == id);
        if (index > -1) {
            this.database.splice(index, 1);
            return true;
        }
    }
}

module.exports = MockDatabase;