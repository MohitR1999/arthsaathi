import express, { Request, Response } from "express";
import type { Express } from "express";
import { Sequelize } from "sequelize";
import { makeCashFlowModel } from "@arthsaathi/models/cashFlow";
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import morgan from "morgan";
import bodyParser from "body-parser";
import { makeRouter as makeReportsRouter } from "../routes/report";

export const makeApp = async (sequelize: Sequelize): Promise<Express> => {
  const app = express();
  const CashFlow = makeCashFlowModel(sequelize);
  const report = makeReportsRouter(sequelize);
  try {
    await CashFlow.sync();
    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use("/api", report);
    app.get("/", (req: Request, res: Response) => {
      res.status(STATUS_CODES.OK).json({
        message: "ArthSaathi Reports " + MESSAGES.HEALTHY_MESSAGE,
      });
    });
  } catch (error) {
    console.log(error);
  }
  return app;
};
