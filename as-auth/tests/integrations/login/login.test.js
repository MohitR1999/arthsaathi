const { describe, it, expect, beforeAll } = require("@jest/globals");
const MockDatabase = require("../../../db/MockDatabase");
const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const { SUCCESSES, ERRORS } = require("../../../utils/constants");

jest.mock("../../../db/connector", () => {
    return jest.fn(() => {
        return new MockDatabase();
    })
})

const app = require("../../../app");
const request = require("supertest");

describe("Successful scenarios", () => {
    const user = new User({
        firstName: "Mohit",
        lastName: "Ranjan",
        email: "test@abc.com",
        password: "testpassword",
        id: ""
    })
    let token = "";

    beforeAll(() => {
        process.env.JWT_SECRET = "this_is_a_long_test_jwt_secret";
        token = jwt.sign({ id : "" }, process.env.JWT_SECRET);
    })

    it("should login successfully with correct credentials", async () => {
        // Register first
        const res = await request(app).post("/api/auth/register").send({...user});
        expect(res.status).toEqual(SUCCESSES.CREATED.STATUS_CODE);
        expect(res.body.message).toEqual(SUCCESSES.CREATED.MESSAGE);

        // Login now
        const loginRes = await request(app).post("/api/auth/login").send({
            email : user.email,
            password : user.password
        });
        expect(loginRes.status).toEqual(SUCCESSES.SUCCESS.STATUS_CODE);
        expect(loginRes.body.jwt).toEqual(token);
    });
})

describe("Unsuccessful scenarios", () => {
    const user = new User({
        firstName: "Mohit",
        lastName: "Ranjan",
        email: "test2@abc.com",
        password: "testpassword",
        id: ""
    })
    let token = "";

    beforeAll(() => {
        process.env.JWT_SECRET = "this_is_a_long_test_jwt_secret";
        token = jwt.sign({ id : "" }, process.env.JWT_SECRET);
    })

    it("should throw error on login if user is not registered", async () => {
        // Login now
        const loginRes = await request(app).post("/api/auth/login").send({
            email : user.email,
            password : user.password
        });
        expect(loginRes.status).toEqual(ERRORS.NOT_FOUND.STATUS_CODE);
        expect(loginRes.body.message).toEqual(ERRORS.NOT_FOUND.ERROR_MSG);
    });

    it("should throw error on login if password is incorrect", async () => {
        // Register first
        const res = await request(app).post("/api/auth/register").send({...user});
        expect(res.status).toEqual(SUCCESSES.CREATED.STATUS_CODE);
        expect(res.body.message).toEqual(SUCCESSES.CREATED.MESSAGE);
        
        // Login now
        const loginRes = await request(app).post("/api/auth/login").send({
            email : user.email,
            password : user.password + "sdasxdfawwserasd"
        });
        expect(loginRes.status).toEqual(ERRORS.INVALID_PASSWORD.STATUS_CODE);
        expect(loginRes.body.message).toEqual(ERRORS.INVALID_PASSWORD.ERROR_MSG);
    });
})