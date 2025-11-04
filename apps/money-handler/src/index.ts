import { makeApp } from "./app";

const PORT = process.env.PORT || 5001;

const runApp = async () => {
    try {
        const app = await makeApp();
        app.listen(PORT, () => {
            console.log(`Money handler app running on port: ${PORT}`);
        });
    } catch (error) {
        console.log('Some error occured! App will not start!!!');
        console.log(error);
    }
};

runApp();