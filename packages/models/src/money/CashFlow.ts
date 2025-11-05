import { Sequelize, DataTypes, ModelOptions } from 'sequelize';

export const makeCashFlowModel = (sequelize: Sequelize, modelOptions?: ModelOptions) => {
    const CashFlow = sequelize.define(
        'CashFlow',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            },

            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },

            category: {
                type: DataTypes.STRING,
                allowNull: false
            },

            sub_category: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            description: {
                type: DataTypes.STRING
            },

            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        modelOptions
    );

    return CashFlow;
};
