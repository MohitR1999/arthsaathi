import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from 'supertest';
import type { Express } from 'express';
import { makeApp } from '../app';
import { Sequelize } from 'sequelize';
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const bcryptCompareTrue = jest.fn().mockResolvedValue(true);

describe("Login endpoint test - Successful scenarios", () => {
    const user = {
        firstName: "Mohit",
        lastName: "Ranjan",
        email: "test@abc.com",
        password: "testpassword",
        id: "test-id",
    };
    let app: Express;
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize();
        app = await makeApp(sequelize);
    });

    it("should login successfully with correct credentials", async () => {
        (bcrypt.compare as jest.Mock) = bcryptCompareTrue;
        // Register first
        const res = await supertest(app).post("/api/auth/register").send({...user});
        expect(res.status).toEqual(STATUS_CODES.CREATED);
        expect(res.body.message).toEqual(MESSAGES.SUCCESSFUL_REGISTER);

        // Login now
        const loginRes = await supertest(app).post("/api/auth/login").send({
            email : user.email,
            password : user.password
        });
        const receviedJwt = loginRes.body.jwt;
        const decoded = jwt.verify(receviedJwt, process.env.JWT_SECRET ?? 'this_is_a_long_test_jwt_secret') as Record<string, string>;
        expect(loginRes.status).toEqual(STATUS_CODES.OK);
        expect(decoded.id).toEqual(user.id);
    });
});

describe("Login endpoint test - Unsuccessful scenarios", () => {
    const user = {
        firstName: "Mohit",
        lastName: "Ranjan",
        email: "test2@abc.com",
        password: "testpassword",
        id: "test-id"
    };
    let app: Express;
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize();
        app = await makeApp(sequelize);
    });

    it("should throw error on login if user is not registered", async () => {
        // Login now
        const loginRes = await supertest(app).post("/api/auth/login").send({
            email : user.email,
            password : user.password
        });
        expect(loginRes.status).toEqual(STATUS_CODES.NOT_FOUND);
        expect(loginRes.body.message).toEqual(MESSAGES.USER_NOT_FOUND);
    });

    it("should throw error on login if password is incorrect", async () => {
        jest.spyOn(bcrypt, 'compare').mockImplementation();
        // Register first
        const res = await supertest(app).post("/api/auth/register").send({...user});
        expect(res.status).toEqual(STATUS_CODES.CREATED);
        expect(res.body.message).toEqual(MESSAGES.SUCCESSFUL_REGISTER);
        
        // Login now
        const loginRes = await supertest(app).post("/api/auth/login").send({
            email : user.email,
            password : user.password + "sdasxdfawwserasd"
        });
        expect(loginRes.status).toEqual(STATUS_CODES.BAD_REQUEST);
        expect(loginRes.body.message).toEqual(MESSAGES.INVALID_CREDENTIALS);
    });
});