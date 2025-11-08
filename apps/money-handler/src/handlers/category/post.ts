import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { CashFlowCategorySchema } from "../../schemas/CashFlowCategorySchema";

const makeHandler = (sequelize: Sequelize) => {
  const CashFlowCategory = sequelize.models.CashFlowCategory;
  if (CashFlowCategory) {
    const post = async (request: Request, response: Response) => {
      const { sub_category } = request.body;
      const { type } = request.query;
      if (request.headers.userId && type) {
        const subCategory = CashFlowCategorySchema.parse({ sub_category });
        await CashFlowCategory.create({
          ...subCategory,
          category: type,
          user_id: request.headers.userId,
        });
        response
          .status(STATUS_CODES.CREATED)
          .json({ message: MESSAGES.SUB_CATEGORY_CREATED });
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
