import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from 'supertest';
import { makeApp } from '../app';
import { MESSAGES } from '@arthsaathi/helpers/messages';
import { STATUS_CODES } from '@arthsaathi/helpers/codes';
import type { Express } from 'express';
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';

describe('Health check for the service', () => {
    const JWT_SECRET = process.env.JWT_SECRET ?? 'this_is_a_long_ass_test_jwt_secret_that_should_not_be_used_in_production';
    let app: Express;
    let sequelize;
    let token: string;

    beforeAll(async () => {
        sequelize = new Sequelize();
        app = await makeApp(sequelize);
        token = jwt.sign({ id: 'test' }, JWT_SECRET);
    });
    
    it('Should return OK message when hitting the default route', async () => {
        const res = await supertest(app).get('/').send();
        expect(res.status).toBe(STATUS_CODES.OK);
        expect(res.body.message).toBe('ArthSaathi Money Handler ' + MESSAGES.HEALTHY_MESSAGE);
    });

    it('Should return Not Found message when hitting any random route', async () => {
        const res = await supertest(app).get('/random/route/money/lol').set({ authorization: `Bearer ${token}` }).send();
        expect(res.status).toBe(STATUS_CODES.NOT_FOUND);
        expect(res.body.message).toBe(MESSAGES.ROUTE_NOT_FOUND);
    });
});