import { NextFunction, Request, Response } from 'express';
import * as z from 'zod';
import { STATUS_CODES } from '../constants/codes';
import { MESSAGES } from '../constants/messages';

const categoryErrorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        const issue = error.issues[0];
        const path = issue?.path[0];
        const message = issue?.message;
        response.status(STATUS_CODES.SERVER_ERROR).json({ message: `${String(path)} error: ${message}` });
    } else {
        console.log(error);
        response.status(STATUS_CODES.SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR });   
    }
    next();
};

export { categoryErrorHandler };