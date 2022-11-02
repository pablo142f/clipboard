import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
require('dotenv').config();

import {
    setUser
} from './src/utils/authentication';

/* Routes */
const employeeRoute = require('./src/routes/employee');

/* DB */
const db = require("./src/models/index");
db.sequelize.sync()
    .then(() => {
        console.log("Synced clipboard db.");
    })
    .catch((err: any) => {
        console.log("Failed to sync clipboard db: " + err.message);
    });

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get('/', async (req: any, res, next) => {
    res.json({ msg: "Hello from Clipboard Services" });
})

app.use(setUser);
app.use('/employee', employeeRoute);

app.listen(port, () => {
    console.log(`Clipboard Services ${port}.`);
});