import { renderRouter, userEvent } from 'expo-router/testing-library'
import { createTestRouter } from '../../test-setup/createTestRouter'
import Index from '../../app/index'
import RootLayout from '../../app/_layout'
import Login from '../../app/login'

describe('Landing screen', () => {
    const user = userEvent.setup()

    it('Should navigate to login page when Get Started is pressed', async () => {
        const routerForLogin = createTestRouter({
            index: Index,
            '_layout': RootLayout,
            'login': Login
        })

        const { findByText, findByRole } = renderRouter(routerForLogin, {
            initialUrl: '/'
        })

        await findByText('Welcome to ArthSaathi!')
        const button = await findByRole('button', { name: 'Get started' })
        await user.press(button)
        await findByText('Log in')
    })
})