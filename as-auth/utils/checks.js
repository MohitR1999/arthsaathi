const isValidName = (text) => {
    const re = /^[a-zA-Z0-9_.]+$/;
    return re.test(text);
}

const isValidEmail = (text) => {
    const re = /^[^@]+@[^@]+\.[^@]+$/;
    return re.test(text);
}

module.exports = { isValidEmail, isValidName }