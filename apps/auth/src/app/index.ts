import express, { Request, Response } from "express";
import type { Express } from "express";
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import { Sequelize } from "sequelize";
import { makeUserModel } from "@arthsaathi/models/user";
import morgan from "morgan";
import { makeRouter as makeRegisterRouter } from "../routes/register";
import { makeRouter as makeLoginRouter } from "../routes/login";
import { makeRouter as makeVerifyRouter } from "../routes/verify";
import { makeRouter as makeProfileRouter } from "../routes/profile";
import { userIdGetter } from "@arthsaathi/helpers/userIdGetter";
import bodyParser from "body-parser";

export const makeApp = async (sequelize: Sequelize): Promise<Express> => {
  const app = express();
  const User = makeUserModel(sequelize);
  const register = makeRegisterRouter(sequelize);
  const login = makeLoginRouter(sequelize);
  const verify = makeVerifyRouter(sequelize);
  const profile = makeProfileRouter(sequelize);
  try {
    await User.sync();
    console.log("Table(s) created successfully!");

    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.get("/", (req: Request, res: Response) => {
      res.status(STATUS_CODES.OK).json({ message: MESSAGES.HEALTHY_MESSAGE });
    });
    app.use("/api/auth", register);
    app.use("/api/auth", login);
    app.use(userIdGetter);
    app.use("/api/auth", verify);
    app.use("/api/auth", profile);
    app.use((req: Request, res: Response) => {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: MESSAGES.ROUTE_NOT_FOUND });
    });
  } catch (error) {
    console.log("Some error occured!");
    console.error(error);
  }
  return app;
};
