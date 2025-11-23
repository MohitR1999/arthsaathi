import { http, HttpResponse } from "msw";
const BASE_URL = "http://test.arthsaathi.ai";

export const registerHandler = http.post(
  `${BASE_URL}/api/auth/register`,
  async ({ request }) => {
    const body = (await request.clone().json()) as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
    if (body.email && body.password) {
      return HttpResponse.json(
        {
          message: "User successfully registered!",
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json(
        {
          message: "Bad request",
        },
        { status: 400 },
      );
    }
  },
);
