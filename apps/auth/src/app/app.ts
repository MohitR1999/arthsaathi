import express, { Request, Response } from 'express'
import { HEALTHY_MESSAGE } from '@arthsaathi/helpers/constants'
const app = express()

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: HEALTHY_MESSAGE })
})

export { app }