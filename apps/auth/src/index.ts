import { makeApp } from './app';
import { Sequelize } from 'sequelize';

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOSTNAME;
const dialect = 'mysql';
const PORT = process.env.PORT || 5000;

const sequelize = new Sequelize(database ?? 'authdb', username ?? 'authuser', password, {
    host,
    dialect
});

const runApp = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database established successfully!');
        const app = await makeApp(sequelize);
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}!`);
        });
        process.on('SIGTERM', () => {
            console.log('Shutting down server!!');
            sequelize.close();
        });
    } catch (error) {
        console.log('Some error occured! App will not start!!!');
        console.log(error);
    }
};

runApp();
