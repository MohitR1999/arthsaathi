import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import { makeApp } from "../app";
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import type { Express } from "express";
import { Sequelize } from "sequelize";

describe("Health check for the service", () => {
  let app: Express;
  let sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize();
    app = await makeApp(sequelize);
  });

  it("Should return OK message when hitting the default route", async () => {
    const res = await supertest(app).get("/").send();
    expect(res.status).toBe(STATUS_CODES.OK);
    expect(res.body.message).toBe(MESSAGES.HEALTHY_MESSAGE);
  });

  it("Should return Not Found message when hitting any random route", async () => {
    const res = await supertest(app).get("/random/route/lol").send();
    expect(res.status).toBe(STATUS_CODES.NOT_FOUND);
    expect(res.body.message).toBe(MESSAGES.ROUTE_NOT_FOUND);
  });
});
