import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import { makeApp } from "../app";
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import type { Express } from "express";
import { Sequelize } from "sequelize";
import { CATEGORY } from "@arthsaathi/helpers/categories";
import jwt from "jsonwebtoken";

describe("Category endpoints test", () => {
  const JWT_SECRET =
    process.env.JWT_SECRET ??
    "this_is_a_long_ass_test_jwt_secret_that_should_not_be_used_in_production";
  let app: Express;
  let sequelize: Sequelize;
  let token: string;

  const userId = "test-user-id";

  const subCategoryObjectToBeCreated = {
    sub_category: "Drinks - Beverage",
  };

  beforeAll(async () => {
    sequelize = new Sequelize();
    app = await makeApp(sequelize);
    token = jwt.sign({ id: userId }, JWT_SECRET);
  });

  it("Should get all sub categories of a specific category when no id is specified", async () => {
    const categories = await supertest(app)
      .get(`/api/category?type=${CATEGORY.EXPENSE}`)
      .set({ authorization: `Bearer ${token}` })
      .send();
    expect(categories.status).toBe(STATUS_CODES.OK);
    expect(categories.body).toStrictEqual([
      {
        id: "test-existing-id",
        sub_category: "Food - Eating out",
        category: "EXPENSE",
      },
    ]);
  });

  it("Should create a sub category with given parameters", async () => {
    const res = await supertest(app)
      .post(`/api/category?type=${CATEGORY.EXPENSE}`)
      .set({ authorization: `Bearer ${token}` })
      .send(subCategoryObjectToBeCreated);
    expect(res.status).toBe(STATUS_CODES.CREATED);
    expect(res.body.message).toBe(MESSAGES.SUB_CATEGORY_CREATED);

    const categories = await supertest(app)
      .get(`/api/category?type=${CATEGORY.EXPENSE}`)
      .set({ authorization: `Bearer ${token}` })
      .send();
    expect(categories.status).toBe(STATUS_CODES.OK);
    expect(categories.body).toStrictEqual([
      {
        id: "test-existing-id",
        sub_category: "Food - Eating out",
        category: "EXPENSE",
      },
      {
        id: "test-sub-category-id",
        sub_category: "Drinks - Beverage",
        category: "EXPENSE",
      },
    ]);
  });

  it("Should delete a sub-category when ID is specified", async () => {
    const res = await supertest(app)
      .delete(`/api/category?type=${CATEGORY.EXPENSE}&id=test-sub-category-id`)
      .set({ authorization: `Bearer ${token}` })
      .send();
    expect(res.status).toBe(STATUS_CODES.OK);
    expect(res.body.message).toBe(MESSAGES.SUB_CATEGORY_DELETED);
  });

  it("Should modify a sub-category when ID is specified", async () => {
    const res = await supertest(app)
      .put(`/api/category?type=${CATEGORY.EXPENSE}&id=test-existing-id`)
      .set({ authorization: `Bearer ${token}` })
      .send({ sub_category: "Food - Eating out in Delhi" });
    expect(res.status).toBe(STATUS_CODES.OK);
    expect(res.body.message).toBe(MESSAGES.SUB_CATEGORY_MODIFIED);
  });
});
