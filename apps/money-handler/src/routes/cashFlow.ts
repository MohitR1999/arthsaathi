import express from "express";
import { Sequelize } from "sequelize";
import {
  makeCashFlowGetHandler,
  makeCashFlowPostHandler,
  makeCashFlowPutHandler,
  makeCashFlowDeleteHandler,
} from "../handlers";

const makeRouter = (sequelize: Sequelize) => {
  const cashFlow = express.Router();
  const CashFlow = sequelize.models.CashFlow;
  if (CashFlow) {
    const post = makeCashFlowPostHandler(sequelize);
    const get = makeCashFlowGetHandler(sequelize);
    const deleteRoute = makeCashFlowDeleteHandler(sequelize);
    const put = makeCashFlowPutHandler(sequelize);
    cashFlow.post("/cashflow", post);
    cashFlow.get("/cashflow", get);
    cashFlow.delete("/cashflow", deleteRoute);
    cashFlow.put("/cashflow", put);
  }
  return cashFlow;
};

export { makeRouter };
