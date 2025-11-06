jest.mock('sequelize', () => {
    
    const mockSequelize = {
        authenticate: jest.fn(),
        
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