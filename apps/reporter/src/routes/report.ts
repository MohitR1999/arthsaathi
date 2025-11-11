import express, { Request, Response } from "express";
import { Sequelize } from "sequelize";

const makeRouter = (sequelize: Sequelize) => {
    const report = express.Router();
    const CashFlow = sequelize.models.CashFlow;
    if (CashFlow) {
        report.get('/reports', (req: Request, res: Response) => {
            res.status(200).json({ message: 'Ok' });
        })
    }
    return report;
}

export { makeRouter }