import { STATUS_CODES } from "@arthsaathi/helpers/codes";
import express, { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { MESSAGES } from "@arthsaathi/helpers/messages";

const makeRouter = (sequelize: Sequelize) => {
  const register = express.Router();
  const User = sequelize.models.User;
  if (User) {
    // if we have the model, then only we should do anything
    register.get("/verify", async (req: Request, res: Response) => {
      const doesUserExist = await User.findOne({
        where: {
          id: req.headers.userId
        }
      })
      if (doesUserExist) {
        res.status(STATUS_CODES.OK).send({ message: 'OK' });
      } else {
        res.status(STATUS_CODES.UNAUTHORIZED).send({ message: MESSAGES.UNAUTHORIZED });
      }
    });
  }

  return register;
};

export { makeRouter };
