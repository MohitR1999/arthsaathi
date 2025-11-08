/* eslint-disable  @typescript-eslint/no-explicit-any */
const cashFlowCategoryDb: any[] = [
  {
    id: "test-existing-id",
    sub_category: "Food - Eating out",
    category: "EXPENSE",
  },
];

const cashFlowDb: any[] = [];

const MockModelCashFlowCategory = {
  count: jest.fn(),
  create: jest.fn((element) => {
    cashFlowCategoryDb.push({
      id: "test-sub-category-id",
      sub_category: element.sub_category,
      category: element.category,
    });
  }),
  findOne: jest.fn(),
  findAll: jest.fn((element: any) => {
    const type = element.where.category;
    return cashFlowCategoryDb.filter((e: any) => e.category === type);
  }),
  destroy: jest.fn((element: any) => {
    const id = element.where.id;
    const index = cashFlowCategoryDb.findIndex((e) => e.id === id);
    cashFlowCategoryDb.splice(index, 1);
  }),
  update: jest.fn((obj: any, element: any) => {
    const id = element.where.id;
    const index = cashFlowCategoryDb.findIndex((e) => e.id === id);
    cashFlowCategoryDb[index].sub_category = obj.sub_category;
  }),

  getDb: jest.fn(() => {
    console.log(cashFlowCategoryDb);
  }),
};

const MockModelCashFlow = {
  count: jest.fn((element: any) => {
    const user_id = element.where.user_id;
    if (user_id) {
      return cashFlowDb.filter((e: any) => e.user_id === user_id).length;
    }
  }),
  create: jest.fn((element) => {
    cashFlowDb.push({ ...element, id: 'test-expense'});
  }),
  findOne: jest.fn(),
  findAll: jest.fn((element: any) => {
    const user_id = element.where.user_id;
    if (user_id) {
      return cashFlowDb.filter((e: any) => e.user_id === user_id);
    }
  }),
  destroy: jest.fn((element: any) => {
    const id = element.where.id;
    const index = cashFlowDb.findIndex((e) => e.id === id);
    cashFlowDb.splice(index, 1);
  }),
  update: jest.fn((obj: any, element: any) => {
    const id = element.where.id;
    const index = cashFlowDb.findIndex((e) => e.id === id);
    cashFlowDb[index] = { ...cashFlowDb[index], ...obj};
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
      CashFlowCategory: MockModelCashFlowCategory,
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
