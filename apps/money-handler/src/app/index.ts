import express, { Request, Response } from 'express';
import type { Express } from 'express';
import { MESSAGES } from '@arthsaathi/helpers/messages';
import { STATUS_CODES } from '@arthsaathi/helpers/codes';
import morgan from 'morgan';
import bodyParser from 'body-parser';

export const makeApp = async (): Promise<Express> => {
    const app = express();
    try {
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.get('/', (req: Request, res: Response) => {
            res.status(STATUS_CODES.OK).json({ message: 'ArthSaathi Money Handler ' + MESSAGES.HEALTHY_MESSAGE });
        });
        app.use((req: Request, res: Response) => {
            res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.ROUTE_NOT_FOUND });
        });
    } catch (error) {
        console.log('Some error occured!');
        console.error(error);    
    }
    return app;
};