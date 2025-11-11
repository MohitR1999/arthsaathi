import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import { makeApp } from "../app";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import type { Express } from "express";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

describe("Cashflow endpoints test", () => {
  const JWT_SECRET =
    process.env.JWT_SECRET ??
    "this_is_a_long_ass_test_jwt_secret_that_should_not_be_used_in_production";
  let app: Express;
  let sequelize: Sequelize;
  let token: string;

  const userId = "test-user-id";

  const cashFlowDb = [
    {
      id: 4,
      date: "2025-11-04T18:30:00.000Z",
      amount: 8000,
      category: "INCOME",
      sub_category: "Rental income",
      description: "Rent from 1st floor",
      user_id: 3,
      createdAt: "2025-11-08T13:59:26.000Z",
      updatedAt: "2025-11-08T14:18:46.000Z",
    },
    {
      id: 5,
      date: "2025-11-04T18:32:00.000Z",
      amount: 6500,
      category: "INCOME",
      sub_category: "Rental income",
      description: "Rent from ground floor",
      user_id: 3,
      createdAt: "2025-11-08T14:44:01.000Z",
      updatedAt: "2025-11-11T15:48:44.000Z",
    },
  ];

  beforeAll(async () => {
    sequelize = new Sequelize();
    app = await makeApp(sequelize);
    token = jwt.sign({ id: userId }, JWT_SECRET);
  });

  it("Should retrieve existing cash flows successfully", async () => {
    const result = await supertest(app)
      .get(`/api/reports`)
      .set({ authorization: `Bearer ${token}` });
    expect(result.status).toBe(STATUS_CODES.OK);
    expect(result.body).toStrictEqual(cashFlowDb);
  });
});
