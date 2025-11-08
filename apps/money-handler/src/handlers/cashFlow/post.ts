import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { CashFlowSchema } from "../../schemas/CashFlowSchema";

const makeHandler = (sequelize: Sequelize) => {
  const CashFlow = sequelize.models.CashFlow;
  if (CashFlow) {
    const post = async (request: Request, response: Response) => {
      const { amount, category, sub_category, description, date } =
        request.body;
      const CashFlowObject = CashFlowSchema.parse({
        amount,
        category,
        sub_category,
        description,
        date,
      });
      if (request.headers.userId) {
        await CashFlow.create({
          ...CashFlowObject,
          user_id: request.headers.userId,
        });
        response
          .status(STATUS_CODES.CREATED)
          .json({ message: MESSAGES.CASH_FLOW_CREATED });
      } else {
        response
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: MESSAGES.UNAUTHORIZED });
      }
    };
    return post;
  }
  return (request: Request, response: Response) => {
    response
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Method not working!" });
  };
};

export { makeHandler };
