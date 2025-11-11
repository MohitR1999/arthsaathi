import { makeApp } from "./app";
import { Sequelize } from "sequelize";

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOSTNAME;
const dialect = "mysql";

const PORT = process.env.PORT || 5002;

const sequelize = new Sequelize(
  database ?? "moneydb",
  username ?? "moneyuser",
  password,
  {
    host,
    dialect,
  },
);

const runApp = async () => {
  try {
    const app = await makeApp(sequelize);
    app.listen(PORT, () => {
      console.log(`Reports app running on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Some error occured! App will not start!!!");
    console.log(error);
  }
};

runApp();
