import { STATUS_CODES } from '@arthsaathi/helpers/codes';
import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { UserSchema } from '../schemas/UserSchema';
import * as z from 'zod';
import { MESSAGES } from '@arthsaathi/helpers/messages';
import { CustomError } from '@arthsaathi/helpers/error';

const makeRouter = (sequelize: Sequelize) => {
    const register = express.Router();
    const User = sequelize.models.User;
    if (User) {
        // if we have the model, then only we should do anything
        register.post('/register', async (req: Request, res: Response) => {
            const { firstName, lastName, email, password } = req.body;
            try {
                const user = UserSchema.parse({ firstName, lastName, email, password });
                const existingUserCount = await User.count({
                    where: {
                        email: user.email
                    }
                });
                if (existingUserCount > 0) {
                    throw new CustomError({ message: MESSAGES.DUPLICATE_EMAIL, code: STATUS_CODES.BAD_REQUEST });
                }
                await User.create({...user});
                res.status(STATUS_CODES.CREATED).json({ message: MESSAGES.SUCCESSFUL_REGISTER });
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const issue = error.issues[0];
                    const path = issue?.path[0];
                    if (path && path === 'firstName') {
                        res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.INVALID_FIRST_NAME });
                    } else if (path && path === 'lastName') {
                        res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.INVALID_LAST_NAME });
                    } else if (path && path === 'email') {
                        res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.INVALID_EMAIL });
                    } else if (path && path === 'password') {
                        res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.INVALID_PASSWORD });
                    } else {
                        res.status(STATUS_CODES.BAD_REQUEST).json({ message: issue?.message });
                    }
                } else if (error instanceof CustomError) {
                    res.status(error.code).json({ message: error.message });
                } 
                else {
                    res.status(STATUS_CODES.SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR });
                }
            }
        });
    }
    
    return register;
};



export { makeRouter }; 