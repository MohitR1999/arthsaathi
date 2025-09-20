const { describe, it, expect } = require("@jest/globals");
const app = require("../../../app");
const request = require("supertest");

describe("Successful scenarios", () => {
    it("should login successfully with correct credentials", async () => {
        const res = await request(app).post("/api/auth/login").send({
            "email": "a@b.com",
            "password": "test"
        });
        expect(res.status).toEqual(200);
        expect(res.body.jwt).toEqual("test");
    });
})