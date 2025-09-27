const ERRORS = {
    INVALID_FIRST_NAME : {
        STATUS_CODE : 400,
        ERROR_MSG : "Invalid first name"
    },

    INVALID_LAST_NAME : {
        STATUS_CODE : 400,
        ERROR_MSG : "Invalid last name"
    },

    INVALID_EMAIL : {
        STATUS_CODE : 400,
        ERROR_MSG : "Invalid email"
    },

    INVALID_PASSWORD : {
        STATUS_CODE : 400,
        ERROR_MSG : "Invalid password"
    },

    NOT_FOUND : {
        STATUS_CODE : 404,
        ERROR_MSG : "User not found"
    },

    INTERNAL_SERVER_ERROR : {
        STATUS_CODE : 500,
        ERROR_MSG : "Some error occured. Please try again later"
    },

    DUPLICATE_USER : {
        STATUS_CODE : 400,
        ERROR_MSG : "A user with same email has been already registered. Please try logging in."
    }
};

const SUCCESSES = {
    SUCCESS : {
        STATUS_CODE : 200,
        MESSAGE : "Success"
    },

    CREATED : {
        STATUS_CODE : 201,
        MESSAGE : "User registered successfully"
    }
};

module.exports = {
    ERRORS,
    SUCCESSES
}