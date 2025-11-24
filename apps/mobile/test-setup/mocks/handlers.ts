import { loginHandler } from "./auth/login";
import { profileHandler } from "./profile/profile";
import { registerHandler } from "./auth/register";

import {
  categoryGetHandler,
  categoryPostHandler,
  categoryPutHandler,
  categoryDeleteHandler,
} from "./money/category";

export const handlers = [
  loginHandler,
  profileHandler,
  registerHandler,
  categoryGetHandler,
  categoryPostHandler,
  categoryPutHandler,
  categoryDeleteHandler,
];
