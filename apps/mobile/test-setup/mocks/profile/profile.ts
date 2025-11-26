import { http, HttpResponse } from "msw";
const BASE_URL = "http://test.arthsaathi.ai";

export const profileHandler = http.get(
  `${BASE_URL}/api/auth/me`,
  async ({ request }) => {
    return HttpResponse.json(
      {
        firstName: "John",
        lastName: "Doe",
        email: "test@foo.com",
      },
      { status: 200 },
    );
  },
);
