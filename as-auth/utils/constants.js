const ERRORS = {
    INVALID_FIRST_NAME : {
        STATUS_CODE : 400,
        ERROR_MSG : "Invalid first name. Please provide an alphanumeric first name"
    },

    INVALID_LAST_NAME : {
        STATUS_CODE : 400,
        ERROR_MSG : "Invalid last name. Please provide an alphanumeric last name"
    },

    INVALID_EMAIL : {
        STATUS_CODE : 400,
        ERROR_MSG : "Invalid email address. Please provide an valid email address"
    },

    INVALID_PASSWORD : {
        STATUS_CODE : 400,
        ERROR_MSG : "Invalid password. Please provide an valid password"
    },

    INTERNAL_SERVER_ERROR : {
        STATUS_CODE : 500,
        ERROR_MSG : "Some server error occured. Please try again later"
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