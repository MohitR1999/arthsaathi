import { describe, expect, it } from "@jest/globals";
import supertest from 'supertest'
import { app } from '../app/app'
import { HEALTHY_MESSAGE } from '@arthsaathi/helpers/constants'

describe('Health check for the service', () => {
    it('Should return OK message when hitting the default route', async () => {
        const res = await supertest(app).get('/').send()
        expect(res.status).toBe(200)
        expect(res.body.message).toBe(HEALTHY_MESSAGE)
    })
})