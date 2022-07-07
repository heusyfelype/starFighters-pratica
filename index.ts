import express, { json } from "express";

import connection from "./dbConnection.js";
import router from "./routers/routes.js";

const port = 4000;
const app = express();

app.use(json());
app.use(router);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})