import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import express, { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { LoginSchema } from "../schemas/LoginSchema";
import * as z from "zod";
import { MESSAGES } from "@arthsaathi/helpers/messages";
import { CustomError } from "@arthsaathi/helpers/error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const makeRouter = (sequelize: Sequelize) => {
  const login = express.Router();
  const User = sequelize.models.User;
  if (User) {
    // if we have the model, then only we should do anything
    login.post("/login", async (req: Request, res: Response) => {
      try {
        if (!req.body) {
          res
            .status(STATUS_CODES.BAD_REQUEST)
            .json({ message: MESSAGES.INVALID_DATA });
          return;
        }
        const { email, password } = req.body;
        const user = LoginSchema.parse({ email, password });
        const existingUser = await User.findOne({
          where: {
            email: user.email,
          },
        });
        if (!existingUser) {
          res
            .status(STATUS_CODES.NOT_FOUND)
            .json({ message: MESSAGES.USER_NOT_FOUND });
        } else {
          const isMatch = await bcrypt.compare(
            password,
            existingUser?.getDataValue("password"),
          );
          if (!isMatch) {
            res
              .status(STATUS_CODES.BAD_REQUEST)
              .json({ message: MESSAGES.INVALID_CREDENTIALS });
          } else {
            const token = jwt.sign(
              { id: existingUser?.getDataValue("id") },
              process.env.JWT_SECRET ?? "this_is_a_long_test_jwt_secret",
            );
            res.status(STATUS_CODES.OK).json({ jwt: token });
          }
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const issue = error.issues[0];
          const path = issue?.path[0];
          if (path && path === "email") {
            res
              .status(STATUS_CODES.BAD_REQUEST)
              .json({ message: MESSAGES.INVALID_EMAIL });
          } else if (path && path === "password") {
            res
              .status(STATUS_CODES.BAD_REQUEST)
              .json({ message: MESSAGES.INVALID_PASSWORD });
          } else {
            res
              .status(STATUS_CODES.BAD_REQUEST)
              .json({ message: issue?.message });
          }
        } else if (error instanceof CustomError) {
          res.status(error.code).json({ message: error.message });
        } else {
          res
            .status(STATUS_CODES.SERVER_ERROR)
            .json({ message: MESSAGES.SERVER_ERROR });
        }
      }
    });
  }

  return login;
};

export { makeRouter };
