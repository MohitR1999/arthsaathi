/* eslint-disable  @typescript-eslint/no-explicit-any */
const cashFlowCategoryDb: any = [];

const MockModel = {
    count: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
};

const MockModelCashFlowCategory = {
    count: jest.fn(),
    create: jest.fn((element) => {
        cashFlowCategoryDb.push(element);
    }),
    findOne: jest.fn(),
    findAll: jest.fn((element: any) => {
        const type = element.where.category;
        return cashFlowCategoryDb.filter((e: any) => e.category === type);
    }),
    getDb: jest.fn(() => {
        console.log(cashFlowCategoryDb);
    })
};

jest.mock('sequelize', () => {
    
    const mockSequelize = {
        authenticate: jest.fn(),
        models: {
            CashFlow: MockModel,
            CashFlowCategory: MockModelCashFlowCategory
        },
        
        define: jest.fn(() => ({
            sync: jest.fn(async () => {}),
            beforeCreate: jest.fn(async () => {})
        }))
    };

    const actualSequelize = jest.requireActual('sequelize');
    return {
        Sequelize: jest.fn(() => mockSequelize),
        DataTypes: actualSequelize.DataTypes,
    };
});

afterAll(() => {
    jest.clearAllMocks();
});