const { describe, it, expect, beforeAll } = require("@jest/globals");
const MockDatabase = require("../../../db/MockDatabase");
const User = require("../../../models/User");

jest.mock("../../../db/connector", () => {
    return jest.fn(() => {
        return new MockDatabase();
    })
})
const app = require("../../../app");
const request = require("supertest");
const { SUCCESSES, ERRORS } = require("../../../utils/constants");

describe("Successful scenarios for registration", () => {
    
    const userToBeRegisterd = new User({
        firstName : "Mohit",
        lastName : "Ranjan",
        email : "test@abc.com",
        password : "testpassword"
    })
    
    it("should register successfully with correct details", async () => {
        const res = await request(app).post("/api/auth/register").send({...userToBeRegisterd});
        expect(res.status).toEqual(SUCCESSES.CREATED.STATUS_CODE);
        expect(res.body.message).toEqual(SUCCESSES.CREATED.MESSAGE);
    });
})

describe("Unsuccessful scenarios for registration", () => {
    const userToBeRegisterdWithInvalidFirstName = new User({
        firstName : "Mohit<",
        lastName : "Ranjan",
        email : "a@b.com",
        password : "testpassword"
    })

    const userToBeRegisterdWithInvalidLastName = new User({
        firstName : "Mohit",
        lastName : ":>",
        email : "test@pqr.com",
        password : "testpassword"
    })

    const userToBeRegisterdWithInvalidEmail = new User({
        firstName : "Mohit",
        lastName : "Ranjan",
        email : "testabcsdf.com",
        password : "testpassword"
    })

    const userToBeRegisterdWithInvalidPassword = new User({
        firstName : "Mohit",
        lastName : "Ranjan",
        email : "test@www.com",
        password : ""
    })

    const userToBeRegisterdThatThrowsException = new User({
        firstName : "Mohit",
        lastName : "Ranjan",
        email : "test@throwsexception.com",
        password : "password"
    })

    const userToBeRegisterd = new User({
        firstName : "Mohit",
        lastName : "Ranjan",
        email : "test@ttt.com",
        password : "testpassword"
    });
    
    it("should throw error in case first name is not valid", async () => {
        const res = await request(app).post("/api/auth/register").send({...userToBeRegisterdWithInvalidFirstName});
        expect(res.status).toEqual(ERRORS.INVALID_FIRST_NAME.STATUS_CODE);
        expect(res.body.message).toEqual(ERRORS.INVALID_FIRST_NAME.ERROR_MSG);
    });

    it("should throw error in case last name is not valid", async () => {
        const res = await request(app).post("/api/auth/register").send({...userToBeRegisterdWithInvalidLastName});
        expect(res.status).toEqual(ERRORS.INVALID_LAST_NAME.STATUS_CODE);
        expect(res.body.message).toEqual(ERRORS.INVALID_LAST_NAME.ERROR_MSG);
    });

    it("should throw error in case email is not valid", async () => {
        const res = await request(app).post("/api/auth/register").send({...userToBeRegisterdWithInvalidEmail});
        expect(res.status).toEqual(ERRORS.INVALID_EMAIL.STATUS_CODE);
        expect(res.body.message).toEqual(ERRORS.INVALID_EMAIL.ERROR_MSG);
    });

    it("should throw error in case password is not valid", async () => {
        const res = await request(app).post("/api/auth/register").send({...userToBeRegisterdWithInvalidPassword});
        expect(res.status).toEqual(ERRORS.INVALID_PASSWORD.STATUS_CODE);
        expect(res.body.message).toEqual(ERRORS.INVALID_PASSWORD.ERROR_MSG);
    });

    it("should throw internal server error in case any other error occurs", async () => {
        const res = await request(app).post("/api/auth/register").send({...userToBeRegisterdThatThrowsException});
        expect(res.status).toEqual(ERRORS.INTERNAL_SERVER_ERROR.STATUS_CODE);
        expect(res.body.message).toEqual(ERRORS.INTERNAL_SERVER_ERROR.ERROR_MSG);
    });

    it("should throw error in case client tries to register with same email ID", async () => {
        const res = await request(app).post("/api/auth/register").send({...userToBeRegisterd});
        expect(res.status).toEqual(SUCCESSES.CREATED.STATUS_CODE);
        expect(res.body.message).toEqual(SUCCESSES.CREATED.MESSAGE);

        const errorRes = await request(app).post("/api/auth/register").send({...userToBeRegisterd});
        expect(errorRes.status).toEqual(ERRORS.DUPLICATE_USER.STATUS_CODE);
        expect(errorRes.body.message).toEqual(ERRORS.DUPLICATE_USER.ERROR_MSG);
    });
})