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
    const user = new User({
        firstName: "Mohit",
        lastName: "Ranjan",
        email: "test@abc.com",
        password: "test123",
        id: "1234"
    });
    const user2 = new User({
        firstName: "Test",
        lastName: "Test",
        email: "test@xyz.com",
        password: "test456",
        id: "5678"
    })

    beforeAll(() => {
        connection = getConnectionInstance();
    })

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("Creating a new user should succeed", async () => {
        const res = await connection.create(user);
        expect(res).toBe(true);
    })

    it("Finding a user by id should succeed", async () => {
        const fetchedUser = await connection.getById(user.id);
        expect(fetchedUser.id).toEqual(user.id);
        expect(fetchedUser.firstName).toEqual(user.firstName);
        expect(fetchedUser.lastName).toEqual(user.lastName);
        expect(fetchedUser.email).toEqual(user.email);
    });

    it("Fetching all users in the database should succeed", async () => {
        const fetchedUsers = await connection.getAll();
        
        expect(fetchedUsers[0].id).toEqual(user2.id);
        expect(fetchedUsers[0].firstName).toEqual(user2.firstName);
        expect(fetchedUsers[0].lastName).toEqual(user2.lastName);
        expect(fetchedUsers[0].email).toEqual(user2.email);
        
        expect(fetchedUsers[1].id).toEqual(user.id);
        expect(fetchedUsers[1].firstName).toEqual(user.firstName);
        expect(fetchedUsers[1].lastName).toEqual(user.lastName);
        expect(fetchedUsers[1].email).toEqual(user.email);
        
    });

    it("Updating a user should succeed", async () => {
        const res = await connection.update({...user, email : "ttt@aaa.com"});
        expect(res).toBe(true);
    });

    it("Deleting a user should succeed", async () => {
        const res = await connection.remove("1234");
        expect(res).toBe(true);
    });
})