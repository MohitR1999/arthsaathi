const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const MockDatabase = require("../../../db/MockDatabase");
const User = require("../../../models/User");

jest.mock("../../../db/connector", () => {
    return jest.fn(() => {
        return new MockDatabase();
    })
})

const getConnectionInstance = require("../../../db/connector");

describe("CRUD Operations for User", () => {
    let connection;
    
    beforeAll(() => {
        connection = getConnectionInstance();
    })

    afterAll(() => {
        jest.clearAllMocks();
    })
    
    it("Creating a new user should succeed", async () => {
        const user = new User({
            firstName : "Mohit",
            lastName : "Ranjan",
            email : "test@abc.com",
            password : "test123",
            id : "1234"
        });

        const res = await connection.create(user);
        expect(res).toBe(true);
    })
})