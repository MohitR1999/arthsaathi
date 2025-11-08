import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import { MESSAGES } from "@arthsaathi/helpers/messages";

const makeHandler = (sequelize: Sequelize) => {
  const CashFlow = sequelize.models.CashFlow;
  if (CashFlow) {
    const deleteRoute = async (request: Request, response: Response) => {
      const { id } = request.query;
      if (!id) {
        response
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: MESSAGES.INVALID_CASH_FLOW_ID });
      }

      if (request.headers.userId) {
        const doesFlowExist = await CashFlow.count({
          where: {
            id,
            user_id: request.headers.userId,
          },
        });
        if (!doesFlowExist) {
          response
            .status(STATUS_CODES.NOT_FOUND)
            .json({ message: MESSAGES.CASH_FLOW_NOT_FOUND });
          return;
        }
        await CashFlow.destroy(
          {
            where: {
              id,
            },
          },
        );
        response
          .status(STATUS_CODES.OK)
          .json({ message: MESSAGES.CASH_FLOW_DELETED });
      } else {
        response
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: MESSAGES.UNAUTHORIZED });
      }
    };
    return deleteRoute;
  }
  return (request: Request, response: Response) => {
    response
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Method not working!" });
  };
};

export { makeHandler };
