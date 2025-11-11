import express, { Request, Response } from "express";
import { Sequelize, Op } from "sequelize";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import { MESSAGES } from "@arthsaathi/helpers/messages";

const makeRouter = (sequelize: Sequelize) => {
  const report = express.Router();
  const CashFlow = sequelize.models.CashFlow;
  if (CashFlow) {
    report.get("/reports", async (request: Request, response: Response) => {
      if (request.headers.userId) {
        const { from, to } = request.query;
        console.log({ from, to });
        let result = {};
        if (!from && !to) {
          result = await CashFlow.findAll({
            where: {
              user_id: request.headers.userId,
            },
          });
        } else if (!from) {
          console.log("!from");
          result = await CashFlow.findAll({
            where: {
              date: {
                [Op.lte]: to,
              },
              user_id: request.headers.userId,
            },
          });
        } else if (!to) {
          console.log("!to");
          result = await CashFlow.findAll({
            where: {
              date: {
                [Op.gte]: from,
              },
              user_id: request.headers.userId,
            },
          });
        } else {
          result = await CashFlow.findAll({
            where: {
              date: {
                [Op.between]: [from, to],
              },
              user_id: request.headers.userId,
            },
          });
        }
        response.status(STATUS_CODES.OK).json(result);
      } else {
        response
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: MESSAGES.UNAUTHORIZED });
      }
    });
  }
  return report;
};

export { makeRouter };
