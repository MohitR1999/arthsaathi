import { http, HttpResponse } from "msw";
const BASE_URL = "http://test.arthsaathi.ai";

const categories = [
  {
    id: "id1",
    category: "EXPENSE",
    sub_category: "Food - Eating out",
  },

  {
    id: "id2",
    category: "EXPENSE",
    sub_category: "Travelling - Commute to office",
  },

  {
    id: "id3",
    category: "INCOME",
    sub_category: "Salary",
  },

  {
    id: "id4",
    category: "INCOME",
    sub_category: "Rental Income",
  },
];

export const categoryPostHandler = http.post(
  `${BASE_URL}/api/category`,
  async ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");

    if (!type) {
      return HttpResponse.json(
        {
          message: "Invalid sub category name. Please enter a valid name",
        },
        { status: 400 },
      );
    }

    if (type !== "INCOME" && type !== "EXPENSE") {
      return HttpResponse.json(
        {
          message: "Invalid sub category name. Please enter a valid name",
        },
        { status: 400 },
      );
    }

    const body = (await request.clone().json()) as {
      sub_category: string;
    };
    if (body.sub_category) {
      return HttpResponse.json(
        {
          message: "Sub category created successfully",
        },
        { status: 201 },
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

export const categoryGetHandler = http.get(
  `${BASE_URL}/api/category`,
  async ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const id = url.searchParams.get("id");

    if (!type) {
      return HttpResponse.json(
        {
          message: "Invalid category name. Please enter a valid name",
        },
        { status: 400 },
      );
    }

    if (!id) {
      return HttpResponse.json(
        categories.filter((item) => item.category === type),
        { status: 200 },
      );
    } else {
      const filteredResults = categories.filter((item) => item.id === id);
      if (filteredResults.length > 0) {
        return HttpResponse.json(filteredResults, { status: 200 });
      } else {
        return HttpResponse.json([], { status: 404 });
      }
    }
  },
);

export const categoryPutHandler = http.get(
  `${BASE_URL}/api/category`,
  async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const body = (await request.clone().json()) as {
      sub_category: string;
    };

    if (!id) {
      return HttpResponse.json(
        {
          message: "Invalid sub category name. Please enter a valid name",
        },
        { status: 400 },
      );
    }

    if (!body.sub_category) {
      return HttpResponse.json(
        {
          message: "Invalid sub category name. Please enter a valid name",
        },
        { status: 400 },
      );
    } else {
      return HttpResponse.json(
        {
          message: "Sub category modified successfully",
        },
        { status: 200 },
      );
    }
  },
);

export const categoryDeleteHandler = http.delete(
  `${BASE_URL}/api/category`,
  async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return HttpResponse.json(
        {
          message: "Invalid sub category ID",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        message: "Sub category deleted successfully",
      },
      { status: 200 },
    );
  },
);
