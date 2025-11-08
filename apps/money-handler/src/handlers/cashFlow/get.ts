import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import { MESSAGES } from "@arthsaathi/helpers/messages";

const makeHandler = (sequelize: Sequelize) => {
  const CashFlow = sequelize.models.CashFlow;
  if (CashFlow) {
    const get = async (request: Request, response: Response) => {
      if (request.headers.userId) {
        const { category, id } = request.query;
        if (category && id) {
          const result = await CashFlow.findAll({
            where: {
              category,
              id,
              user_id: request.headers.userId,
            },
          });
          response.status(STATUS_CODES.OK).json(result);
        } else if (category) {
          const result = await CashFlow.findAll({
            where: {
              category,
              user_id: request.headers.userId,
            },
          });
          response.status(STATUS_CODES.OK).json(result);
        } else if (id) {
          const result = await CashFlow.findAll({
            where: {
              id,
              user_id: request.headers.userId,
            },
          });
          response.status(STATUS_CODES.OK).json(result);
        } else {
          const result = await CashFlow.findAll({
            where: {
              user_id: request.headers.userId,
            },
          });
          response.status(STATUS_CODES.OK).json(result);
        }
      } else {
        response
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: MESSAGES.UNAUTHORIZED });
      }
    };
    return get;
  }
  return (request: Request, response: Response) => {
    response
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Method not working!" });
  };
};

export { makeHandler };
