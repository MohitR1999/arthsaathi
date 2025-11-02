import { Sequelize, DataTypes, ModelOptions } from 'sequelize'

export const makeUserModel = (sequelize: Sequelize, modelOptions?: ModelOptions) => {
    return sequelize.define(
        'User',
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },
        modelOptions
    )
}