import type { AuthSession } from '../../types/auth/authTypes'
import { useAuthStore } from '../useAuthStore'

export const useSignIn = () => {
    const signIn = useAuthStore((state) => state.login);
    return (session: AuthSession) => {
        // Any expansion of functionality will be done here
        signIn(session);
    }
}