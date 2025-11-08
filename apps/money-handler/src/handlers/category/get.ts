import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import { MESSAGES } from "@arthsaathi/helpers/messages";

const makeHandler = (sequelize: Sequelize) => {
  const CashFlowCategory = sequelize.models.CashFlowCategory;
  if (CashFlowCategory) {
    const get = async (request: Request, response: Response) => {
      const { type, id } = request.query;
      if (request.headers.userId) {
        if (type && id) {
          const result = await CashFlowCategory.findAll({
            where: {
              category: type,
              id,
              user_id: request.headers.userId,
            },
            attributes: ["id", "category", "sub_category"],
          });
          response
            .status(STATUS_CODES.OK)
            .json(result.length == 1 ? result[0] : result);
        } else if (type) {
          const result = await CashFlowCategory.findAll({
            where: {
              category: type,
              user_id: request.headers.userId,
            },
            attributes: ["id", "category", "sub_category"],
          });
          response.status(STATUS_CODES.OK).json(result);
        } else {
          const result = await CashFlowCategory.findAll({
            where: {
              user_id: request.headers.userId,
            },
            attributes: ["id", "category", "sub_category"],
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
