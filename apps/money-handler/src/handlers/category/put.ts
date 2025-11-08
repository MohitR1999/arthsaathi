import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import { MESSAGES } from "@arthsaathi/helpers/messages";

const makeHandler = (sequelize: Sequelize) => {
  const CashFlowCategory = sequelize.models.CashFlowCategory;
  if (CashFlowCategory) {
    const put = async (request: Request, response: Response) => {
      const { id } = request.query;
      const { sub_category } = request.body;
      if (request.headers.userId) {
        if (!id) {
          response
            .status(STATUS_CODES.BAD_REQUEST)
            .json({ message: MESSAGES.INVALID_SUB_CATEGORY_ID });
        } else if (!sub_category) {
          response
            .status(STATUS_CODES.BAD_REQUEST)
            .json({ message: MESSAGES.INVALID_SUB_CATEGORY_NAME });
        } else {
          await CashFlowCategory.update(
            { sub_category },
            {
              where: {
                id,
              },
            },
          );
          response
            .status(STATUS_CODES.OK)
            .json({ message: MESSAGES.SUB_CATEGORY_MODIFIED });
        }
      } else {
        response
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: MESSAGES.UNAUTHORIZED });
      }
    };
    return put;
  }
  return (request: Request, response: Response) => {
    response
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Method not working!" });
  };
};

export { makeHandler };
