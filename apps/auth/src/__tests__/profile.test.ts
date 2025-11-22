import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import type { Express } from "express";
import { makeApp } from "../app";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";

const bcryptCompareTrue = jest.fn().mockResolvedValue(true);

describe("User profile", () => {
  const user = {
    firstName: "Mohit",
    lastName: "Ranjan",
    email: "test@foo.com",
    password: "testpassword",
    id: "test-id",
  };
  let app: Express;
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize();
    app = await makeApp(sequelize);
  });

  it("should fetch correct user details when authenticated", async () => {
    (bcrypt.compare as jest.Mock) = bcryptCompareTrue;

    // Login now
    const loginRes = await supertest(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });
    const receviedJwt = loginRes.body.jwt;

    // Get user profile details
    const profileRes = await supertest(app)
      .get("/api/auth/me")
      .set({
        authorization: `Bearer ${receviedJwt}`,
      });

    expect(profileRes.body.firstName).toBe(user.firstName);
    expect(profileRes.body.lastName).toBe(user.lastName);
    expect(profileRes.body.email).toBe(user.email);
  });
});
