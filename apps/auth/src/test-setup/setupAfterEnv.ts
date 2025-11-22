/* eslint-disable  @typescript-eslint/no-explicit-any */
jest.mock("sequelize", () => {
  const db: any = [
    {
      firstName: "Mohit",
      lastName: "Ranjan",
      email: "test@foo.com",
      id: "test-id",
      getDataValue: function (this: any, key: string) {
        return this[key];
      },
    },
  ];

  const mockSequelize = {
    authenticate: jest.fn(),
    models: {
      User: {
        count: jest.fn((element: any) => {
          return db.filter((e: any) => e.email === element.where.email).length;
        }),
        create: jest.fn((element) => {
          if (element.email.includes("throwsexception"))
            throw new Error("Internal server error");
          db.push({
            ...element,
            id: "test-id",
            getDataValue: function (this: any, key: string) {
              return this[key];
            },
          });
        }),
        findOne: jest.fn((query) => {
          let user;
          if (query.where.email) {
            user = db.find((e: any) => {
              return e.email === query.where.email;
            });
          } else if (query.where.id) {
            user = db.find((e: any) => {
              return e.id === query.where.id;
            });
          }
          return user;
        }),
      },
    },
    define: jest.fn(() => ({
      sync: jest.fn(async () => {}),
      beforeCreate: jest.fn(async () => {}),
    })),
  };

  const actualSequelize = jest.requireActual("sequelize");
  return {
    Sequelize: jest.fn(() => mockSequelize),
    DataTypes: actualSequelize.DataTypes,
  };
});

afterAll(() => {
  jest.clearAllMocks();
});
