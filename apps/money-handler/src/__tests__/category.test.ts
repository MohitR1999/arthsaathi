import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from 'supertest';
import { makeApp } from '../app';
import { MESSAGES } from '@arthsaathi/helpers/messages';
import { STATUS_CODES } from '@arthsaathi/helpers/codes';
import type { Express } from 'express';
import { Sequelize } from 'sequelize';
import { CATEGORY } from '@arthsaathi/helpers/categories';
import jwt from 'jsonwebtoken';

describe('Category endpoints test', () => {
    const JWT_SECRET = process.env.JWT_SECRET ?? 'this_is_a_long_ass_test_jwt_secret_that_should_not_be_used_in_production';
    let app: Express;
    let sequelize: Sequelize;
    let token: string;

    const userId = 'test-id';

    const subCategoryObjectToBeCreated = {
        sub_category: "Food - Eating out"
    };

    beforeAll(async () => {
        sequelize = new Sequelize();
        app = await makeApp(sequelize);
        token = jwt.sign({ id: userId }, JWT_SECRET);
    });

    it('Should create a sub category with given parameters', async () => {
        const res = await supertest(app).post(`/api/category?type=${CATEGORY.EXPENSE}`).set({ 'authorization' : `Bearer ${token}` }).send(subCategoryObjectToBeCreated);
        expect(res.status).toBe(STATUS_CODES.CREATED);
        expect(res.body.message).toBe(MESSAGES.SUB_CATEGORY_CREATED);

        const categories = await supertest(app).get(`/api/category?type=${CATEGORY.EXPENSE}`).set({ 'authorization' : `Bearer ${token}` }).send();
        expect(categories.status).toBe(STATUS_CODES.OK);
        expect(categories.body).toStrictEqual([{ user_id: 'test-id', sub_category: 'Food - Eating out', category: 'EXPENSE' }]);
    });
});