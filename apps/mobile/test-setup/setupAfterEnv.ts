import './mocks/msw.polyfills'

import { server } from './mocks/server'
// Set environment variables before handlers are imported
process.env.EXPO_PUBLIC_API_BASE_URL = 'http://test.arthsaathi.ai'


beforeAll(() => {
    server.listen()
})

afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})