import express, { Request, Response } from "express";
import type { Express } from "express";
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import morgan from "morgan";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";
import { makeCashFlowModel } from "@arthsaathi/models/cashFlow";
import { makeCashFlowCategoryModel } from "@arthsaathi/models/cashFlowCategory";
import { userIdGetter } from "@arthsaathi/helpers/userIdGetter";
import { categoryErrorHandler } from "@arthsaathi/helpers/errorHandler";

import { makeRouter as makeCategoryRouter } from "../routes/category";
import { makeRouter as makeCashFlowRouter } from '../routes/cashFlow';

export const makeApp = async (sequelize: Sequelize): Promise<Express> => {
  const app = express();
  const CashFlow = makeCashFlowModel(sequelize);
  const CashFlowCategory = makeCashFlowCategoryModel(sequelize);

  const category = makeCategoryRouter(sequelize);
  const cashflow = makeCashFlowRouter(sequelize);
  try {
    await CashFlow.sync();
    await CashFlowCategory.sync();
    console.log("Table(s) created successfully for money handler");

    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(userIdGetter);
    app.use("/api", category);
    app.use("/api", cashflow);
    app.get("/", (req: Request, res: Response) => {
      res.status(STATUS_CODES.OK).json({
        message: "ArthSaathi Money Handler " + MESSAGES.HEALTHY_MESSAGE,
      });
    });
    app.use((req: Request, res: Response) => {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: MESSAGES.ROUTE_NOT_FOUND });
    });
    app.use(categoryErrorHandler);
  } catch (error) {
    console.log("Some error occured!");
    console.error(error);
  }
  return app;
};
