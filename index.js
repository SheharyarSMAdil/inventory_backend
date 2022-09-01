import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from "./routes/user.js"
import productRoutes from "./routes/product.js"
import cors from "cors"
import path from "path";
import fs from "fs"
// const path = require("path");
// const fs = require("fs");


const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/products', productRoutes);

app.get('/', express.static("./public"));

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
});