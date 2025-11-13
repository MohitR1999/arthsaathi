import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import type { Express } from "express";
import { makeApp } from "../app";
import { Sequelize } from "sequelize";
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";

describe("Register endpoint test - Successful scenarios", () => {
  let app: Express;
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize();
    app = await makeApp(sequelize);
  });

  const userToBeRegisterd = {
    firstName: "Mohit",
    lastName: "Ranjan",
    email: "test@abc.com",
    password: "testpassword",
  };

  it("should register successfully with correct details", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({ ...userToBeRegisterd });
    expect(res.status).toBe(STATUS_CODES.CREATED);
    expect(res.body.message).toBe(MESSAGES.SUCCESSFUL_REGISTER);
  });
});

describe("Register endpoint test - Unsuccessful scenarios", () => {
  let app: Express;
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize();
    app = await makeApp(sequelize);
  });

  const userToBeRegisterdWithInvalidFirstName = {
    firstName: "Mohit<",
    lastName: "Ranjan",
    email: "a@b.com",
    password: "testpassword",
  };

  const userToBeRegisterdWithInvalidLastName = {
    firstName: "Mohit",
    lastName: ":>",
    email: "test@pqr.com",
    password: "testpassword",
  };

  const userToBeRegisterdWithInvalidEmail = {
    firstName: "Mohit",
    lastName: "Ranjan",
    email: "testabcsdf.com",
    password: "testpassword",
  };

  const userToBeRegisterdWithInvalidPassword = {
    firstName: "Mohit",
    lastName: "Ranjan",
    email: "test@www.com",
    password: "",
  };

  const userToBeRegisterd = {
    firstName: "Mohit",
    lastName: "Ranjan",
    email: "test@ttt.com",
    password: "testpassword",
  };

  const userToBeRegisterdThatThrowsException = {
    firstName: "Mohit",
    lastName: "Ranjan",
    email: "test@throwsexception.com",
    password: "password",
  };

  it("should throw error in case first name is not valid", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({ ...userToBeRegisterdWithInvalidFirstName });
    expect(res.status).toEqual(STATUS_CODES.BAD_REQUEST);
    expect(res.body.message).toEqual(MESSAGES.INVALID_FIRST_NAME);
  });

  it("should throw error in case last name is not valid", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({ ...userToBeRegisterdWithInvalidLastName });
    expect(res.status).toEqual(STATUS_CODES.BAD_REQUEST);
    expect(res.body.message).toEqual(MESSAGES.INVALID_LAST_NAME);
  });

  it("should throw error in case email is not valid", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({ ...userToBeRegisterdWithInvalidEmail });
    expect(res.status).toEqual(STATUS_CODES.BAD_REQUEST);
    expect(res.body.message).toEqual(MESSAGES.INVALID_EMAIL);
  });

  it("should throw error in case password is not valid", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({ ...userToBeRegisterdWithInvalidPassword });
    expect(res.status).toEqual(STATUS_CODES.BAD_REQUEST);
    expect(res.body.message).toEqual(MESSAGES.INVALID_PASSWORD);
  });

  it("should throw error in case client tries to register with same email ID", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({ ...userToBeRegisterd });
    expect(res.status).toBe(STATUS_CODES.CREATED);
    expect(res.body.message).toBe(MESSAGES.SUCCESSFUL_REGISTER);

    const errorRes = await supertest(app)
      .post("/api/auth/register")
      .send({ ...userToBeRegisterd });
    expect(errorRes.status).toEqual(STATUS_CODES.BAD_REQUEST);
    expect(errorRes.body.message).toEqual(MESSAGES.DUPLICATE_EMAIL);
  });

  it("should throw internal server error in case any other error occurs", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({ ...userToBeRegisterdThatThrowsException });
    expect(res.status).toEqual(STATUS_CODES.SERVER_ERROR);
    expect(res.body.message).toEqual(MESSAGES.SERVER_ERROR);
  });

  it("should throw bad request error in case no request body is supplied", async () => {
    const res = await supertest(app).post("/api/auth/register").send();
    expect(res.status).toEqual(STATUS_CODES.BAD_REQUEST);
    expect(res.body.message).toEqual(MESSAGES.INVALID_DATA);
  });
});
