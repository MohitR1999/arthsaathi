import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import { makeApp } from "../app";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import type { Express } from "express";
import { Sequelize } from "sequelize";
import { CATEGORY } from "@arthsaathi/helpers/categories";
import jwt from "jsonwebtoken";
import { MESSAGES } from "@arthsaathi/helpers/messages";

describe("Cashflow endpoints test", () => {
  const JWT_SECRET =
    process.env.JWT_SECRET ??
    "this_is_a_long_ass_test_jwt_secret_that_should_not_be_used_in_production";
  let app: Express;
  let sequelize: Sequelize;
  let token: string;

  const userId = "test-user-id";

  const cashFlowCategoryToBeCreated = {
    amount: 142.86,
    category: CATEGORY.EXPENSE,
    sub_category: "Food - Eating out",
    description: "Eating out at Haldiram's",
    date: "2025-11-08T09:26:23.463Z",
  };

  beforeAll(async () => {
    sequelize = new Sequelize();
    app = await makeApp(sequelize);
    token = jwt.sign({ id: userId }, JWT_SECRET);
  });

  it("Should create a cash flow successfully", async () => {
    const result = await supertest(app)
      .post(`/api/cashflow`)
      .set({ authorization: `Bearer ${token}` })
      .send(cashFlowCategoryToBeCreated);
    expect(result.status).toBe(STATUS_CODES.CREATED);
    expect(result.body.message).toEqual(MESSAGES.CASH_FLOW_CREATED);
  });

  it("Should retrieve all cash flows successfully", async () => {
    const result = await supertest(app)
      .get(`/api/cashflow`)
      .set({ authorization: `Bearer ${token}` });
    expect(result.status).toBe(STATUS_CODES.OK);
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("Should modify a cash flow by providing its ID", async () => {
    const result = await supertest(app)
      .put(`/api/cashflow?id=test-expense`)
      .set({ authorization: `Bearer ${token}` })
      .send({ ...cashFlowCategoryToBeCreated, amount: 550.63 });
    expect(result.status).toBe(STATUS_CODES.OK);
    expect(result.body.message).toEqual(MESSAGES.CASH_FLOW_MODIFIED);

    const modifiedResult = await supertest(app)
      .get(`/api/cashflow?id=test-expense`)
      .set({ authorization: `Bearer ${token}` });
    expect(modifiedResult.status).toBe(STATUS_CODES.OK);
    expect(modifiedResult.body[0].amount).toBeCloseTo(550.63);
  });

  it("Should delete a cash flow by providing its ID", async () => {
    const result = await supertest(app)
      .delete(`/api/cashflow?id=test-expense`)
      .set({ authorization: `Bearer ${token}` })
      .send();
    expect(result.status).toBe(STATUS_CODES.OK);
    expect(result.body.message).toEqual(MESSAGES.CASH_FLOW_DELETED);
  });
});
