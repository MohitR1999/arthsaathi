const MockModel = {
    count: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
};

jest.mock('sequelize', () => {
    
    const mockSequelize = {
        authenticate: jest.fn(),
        models: {
            CashFlow: MockModel,
            CashFlowCategory: MockModel
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