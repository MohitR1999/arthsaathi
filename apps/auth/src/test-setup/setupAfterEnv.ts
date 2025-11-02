/* eslint-disable  @typescript-eslint/no-explicit-any */
jest.mock('sequelize', () => {
    const db:any = [];
    
    const mockSequelize = {
        authenticate: jest.fn(),
        models: {
            User: {
                count: jest.fn((element: any) => {
                    return db.filter((e: any) => e.email === element.where.email).length;
                }),
                create: jest.fn((element) => {
                    if (element.email.includes('throwsexception')) throw new Error('Internal server error');
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