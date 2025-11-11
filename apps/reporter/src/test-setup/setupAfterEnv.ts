/* eslint-disable  @typescript-eslint/no-explicit-any */
const cashFlowDb: any[] = [
  {
    id: 4,
    date: "2025-11-04T18:30:00.000Z",
    amount: 8000,
    category: "INCOME",
    sub_category: "Rental income",
    description: "Rent from 1st floor",
    user_id: 3,
    createdAt: "2025-11-08T13:59:26.000Z",
    updatedAt: "2025-11-08T14:18:46.000Z",
  },
  {
    id: 5,
    date: "2025-11-04T18:32:00.000Z",
    amount: 6500,
    category: "INCOME",
    sub_category: "Rental income",
    description: "Rent from ground floor",
    user_id: 3,
    createdAt: "2025-11-08T14:44:01.000Z",
    updatedAt: "2025-11-11T15:48:44.000Z",
  },
];

const MockModelCashFlow = {
  count: jest.fn((element: any) => {
    const user_id = element.where.user_id;
    if (user_id) {
      return cashFlowDb.filter((e: any) => e.user_id === user_id).length;
    }
  }),
  create: jest.fn((element) => {
    cashFlowDb.push({ ...element, id: "test-expense" });
  }),
  findOne: jest.fn(),
  findAll: jest.fn(() => {
    return cashFlowDb;
  }),
  destroy: jest.fn((element: any) => {
    const id = element.where.id;
    const index = cashFlowDb.findIndex((e) => e.id === id);
    cashFlowDb.splice(index, 1);
  }),
  update: jest.fn((obj: any, element: any) => {
    const id = element.where.id;
    const index = cashFlowDb.findIndex((e) => e.id === id);
    cashFlowDb[index] = { ...cashFlowDb[index], ...obj };
  }),

  getDb: jest.fn(() => {
    console.log(cashFlowDb);
  }),
};

jest.mock("sequelize", () => {
  const mockSequelize = {
    authenticate: jest.fn(),
    models: {
      CashFlow: MockModelCashFlow,
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
