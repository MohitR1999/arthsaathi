import express from 'express';
import { Sequelize } from 'sequelize';
import { makeCategoryPostHandler, makeCategoryGetHandler } from '../handlers';

const makeRouter = (sequelize: Sequelize) => {
    const category = express.Router();
    const CashFlowCategory = sequelize.models.CashFlowCategory;
    if (CashFlowCategory) {
        const post = makeCategoryPostHandler(sequelize);
        const get = makeCategoryGetHandler(sequelize);
        category.post('/category', post);
        category.get('/category', get);
    }
    return category;
};

export { makeRouter };