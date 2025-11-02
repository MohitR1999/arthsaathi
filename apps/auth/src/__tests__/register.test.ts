import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from 'supertest';
import type { Express } from 'express';
import { makeApp } from '../app';
import { Sequelize } from 'sequelize';

describe('Register endpoint test', () => {
    let app: Express;
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize();
        app = await makeApp(sequelize);
    });
    
    const userToBeRegisterd = {
        firstName : "Mohit",
        lastName : "Ranjan",
        email : "test@abc.com",
        password : "testpassword"
    };

    it('should register successfully with correct details', async () => {
        const res = await supertest(app).post('/api/auth/register').send({...userToBeRegisterd});
        expect(res.status).toBe(200);
    });
});