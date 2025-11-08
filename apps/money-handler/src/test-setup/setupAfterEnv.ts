/* eslint-disable  @typescript-eslint/no-explicit-any */
const cashFlowCategoryDb: any[] = [
  {
    id: "test-existing-id",
    sub_category: "Food - Eating out",
    category: "EXPENSE",
  },
];

const MockModel = {
  count: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
};

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
    console.log(cashFlowCategoryDb);
  }),

  getDb: jest.fn(() => {
    console.log(cashFlowCategoryDb);
  }),
};

jest.mock("sequelize", () => {
  const mockSequelize = {
    authenticate: jest.fn(),
    models: {
      CashFlow: MockModel,
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
