class User {
    constructor({firstName, lastName, email, password, id = ""}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.id = id;
    }
}

module.exports = User;