import express from "express";
import { Sequelize } from "sequelize";
import {
  makeCategoryPostHandler,
  makeCategoryGetHandler,
  makeCategoryDeleteHandler,
  makeCategoryPutHandler,
} from "../handlers";

const makeRouter = (sequelize: Sequelize) => {
  const category = express.Router();
  const CashFlowCategory = sequelize.models.CashFlowCategory;
  if (CashFlowCategory) {
    const post = makeCategoryPostHandler(sequelize);
    const get = makeCategoryGetHandler(sequelize);
    const deleteRoute = makeCategoryDeleteHandler(sequelize);
    const put = makeCategoryPutHandler(sequelize);
    category.post("/category", post);
    category.get("/category", get);
    category.delete("/category", deleteRoute);
    category.put("/category", put);
  }
  return category;
};

export { makeRouter };
