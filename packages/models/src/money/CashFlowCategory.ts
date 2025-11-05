import { Sequelize, DataTypes, ModelOptions } from 'sequelize';

export const makeCashFlowCategoryModel = (sequelize: Sequelize, modelOptions?: ModelOptions) => {
    const CashFlowCategory = sequelize.define(
        'CashFlowCategory',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            category: {
                type: DataTypes.STRING,
                allowNull: false
            },

            sub_category: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        modelOptions
    );

    return CashFlowCategory;
};
