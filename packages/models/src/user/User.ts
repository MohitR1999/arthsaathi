import { Sequelize, DataTypes, ModelOptions } from 'sequelize';
import bcrypt from 'bcrypt';

export const makeUserModel = (sequelize: Sequelize, modelOptions?: ModelOptions) => {
    const User = sequelize.define(
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
    );

    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.getDataValue('password'), salt);
        user.setDataValue('password', hashedPassword);
    });

    return User;
};