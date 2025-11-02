jest.mock('sequelize', () => {
    const db = [];
    
    const mockSequelize = {
        authenticate: jest.fn(),
        models: {
            User: {
                count: jest.fn(() => 0),
                create: jest.fn((element) => {
                    db.push(element);
                }),
            }
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