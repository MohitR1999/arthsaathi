import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../constants/codes';
import { MESSAGES } from '../constants/messages';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET ?? 'this_is_a_long_jwt_secret';


const userIdGetter = async (req: Request, res: Response, next: NextFunction) => {
    if (req.url === '/') next();
    else {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, JWT_SECRET) as Record<string, string>;
                const id = decoded.id;
                req.headers.userId = id;
                next();
            } else {
                res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.UNAUTHORIZED });
                return;
            }
        } catch (error) {
            console.log(error);
            res.status(STATUS_CODES.SERVER_ERROR).json({ message: error });
        }
    }
    return;
};

export { userIdGetter };

