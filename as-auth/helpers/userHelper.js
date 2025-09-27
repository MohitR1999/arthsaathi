const User = require('../models/User');
const bcrypt = require('bcrypt');
const CustomError = require("../errors/CustomError");
const { ERRORS } = require("../utils/constants");
const { isValidEmail, isValidName } = require("../utils/checks");

const createUser = async ({ firstName, lastName, email, password }) => {
    if (!isValidName(firstName)) {
        throw new CustomError(ERRORS.INVALID_FIRST_NAME.ERROR_MSG, ERRORS.INVALID_FIRST_NAME.STATUS_CODE);
    }

    if (!isValidName(lastName)) {
        throw new CustomError(ERRORS.INVALID_LAST_NAME.ERROR_MSG, ERRORS.INVALID_LAST_NAME.STATUS_CODE);
    }

    if (!isValidEmail(email)) {
        throw new CustomError(ERRORS.INVALID_EMAIL.ERROR_MSG, ERRORS.INVALID_EMAIL.STATUS_CODE);
    }

    if (!password.length) {
        throw new CustomError(ERRORS.INVALID_PASSWORD.ERROR_MSG, ERRORS.INVALID_PASSWORD.STATUS_CODE);
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return new User({
        firstName,
        lastName,
        email,
        password : encryptedPassword
    });
}

const modifyUser = (newUser, oldUser) => {
    if (!isValidName(newUser.firstName)) {
        throw new CustomError(ERRORS.INVALID_FIRST_NAME.ERROR_MSG, ERRORS.INVALID_FIRST_NAME.STATUS_CODE);
    }

    if (!isValidName(newUser.lastName)) {
        throw new CustomError(ERRORS.INVALID_LAST_NAME.ERROR_MSG, ERRORS.INVALID_LAST_NAME.STATUS_CODE);
    }

    if (!isValidEmail(newUser.email)) {
        throw new CustomError(ERRORS.INVALID_EMAIL.ERROR_MSG, ERRORS.INVALID_EMAIL.STATUS_CODE);
    }

    if (newUser.firstName != oldUser.firstName) {
        oldUser.firstName = newUser.firstName;
    }

    if (newUser.lastName != oldUser.lastName) {
        oldUser.lastName = newUser.lastName;
    }

    if (newUser.email != oldUser.email) {
        oldUser.email = newUser.email;
    }

    return oldUser;
}

module.exports = { createUser, modifyUser }