import { loginHandler } from "./auth/login";
import { profileHandler } from "./profile/profile";
import { registerHandler } from "./auth/register";
export const handlers = [loginHandler, profileHandler, registerHandler];

