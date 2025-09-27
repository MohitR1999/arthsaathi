const Database = require("./Database");
const mysql = require("mysql2/promise");
const User = require("../models/User");

class MySQLDB extends Database {
    constructor(options) {
        super(options);
        this.pool = mysql.createPool({ ...options, connectionLimit: 10 });
        this.fetchAllUsersQuery = "SELECT * FROM authdb.users";
    }

    initialize = async () => {
        try {
            await this.pool.query("create database if not exists authdb");
            await this.pool.query(`
                create table if not exists authdb.users (
                	id INT AUTO_INCREMENT PRIMARY KEY,
                    first_name varchar(255),
                    last_name varchar(255),
                    email varchar(255),
                    password varchar(255)
                )`)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Creates a user
     * @param {User} user 
     */
    create = async (user) => {
        try {
            await this.pool.query(`
                INSERT INTO authdb.users (first_name, last_name, email, password)
                values (?, ?, ?, ?)
                `,
                [user.firstName, user.lastName, user.email, user.password]
            );
            return true;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
     * Returns the unique user specified by the ID
     * @param {String} id unique ID of the user 
     * @returns {Promise<User[]>}
     */
    getById = async (id) => {
        try {
            const [results] = await this.pool.query("SELECT * FROM authdb.users WHERE id = ?", [id]);
            return results.map(object => new User({
                id: object.id,
                firstName: object.first_name,
                lastName: object.last_name,
                email: object.email,
                password : object.password
            }));
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    /**
     * Returns the unique user specified by the email ID
     * @param {String} email email ID of the user 
     * @returns {Promise<User[]>}
     */
    getByEmail = async (email) => {
        try {
            const [results] = await this.pool.query("SELECT * FROM authdb.users WHERE email = ?", [email]);
            return results.map(object => new User({
                id: object.id,
                firstName: object.first_name,
                lastName: object.last_name,
                email: object.email,
                password : object.password
            }));
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    /**
     * Returns the list of all users
     * @returns {Promise<User[]>}
     */
    getAll = async () => {
        try {
            const [results] = await this.pool.query("SELECT * FROM authdb.users")
            return results.map(object => new User({
                id: object.id,
                firstName: object.first_name,
                lastName: object.last_name,
                email: object.email,
                password : object.password
            }));
        } catch (error) {
            console.log(error);
            throw err;
        }
    }

    /**
     * Modifies a specific user. 
     * @param {User} user The modified user object that needs to be set in the database
     */
    update = async (user) => {
        try {
            await this.pool.query(`UPDATE authdb.users SET first_name = ?, last_name = ?, email = ? WHERE id = ?`,
                [user.firstName, user.lastName, user.email, user.id]
            )
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Deletes a user by the provided id
     * @param {String} id 
     */
    remove = async (id) => {
        try {
            await this.pool.query(`DELETE FROM authdb.users WHERE id = ?`,
                [id]
            )
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = MySQLDB;