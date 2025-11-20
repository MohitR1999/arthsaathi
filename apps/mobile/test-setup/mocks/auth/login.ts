import { http, HttpResponse } from "msw";
const BASE_URL = "http://test.arthsaathi.ai";

export const loginHandler = http.post(
  `${BASE_URL}/api/auth/login`,
  async ({ request }) => {
    const body = (await request.clone().json()) as {
      email: string;
      password: string;
    };
    if (body.email && body.password) {
      return HttpResponse.json(
        {
          jwt: "test-jwt",
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json(
        {
          message: "UNAUTHORIZED",
        },
        { status: 401 },
      );
    }
  },
);
