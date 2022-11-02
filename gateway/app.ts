/* Dependencies */
import express, { Request, Response, NextFunction } from 'express';
import cors = require('cors');
import proxy = require('express-http-proxy');
require('dotenv').config();

import {
    validateToken
} from './src/utils/authentication';

/* Routes */
const authenticationRoute = require('./src/routes/authentication');

/* DB */
const db = require("./src/models/index");
db.sequelize.sync()
    .then(() => {
        console.log("Synced gateway db.");
    })
    .catch((err: any) => {
        console.log("Failed to sync gateway db: " + err.message);
    });


/* Configurations */
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/* Public endpoint */
app.get('/', async (req: any, res, next) => {
    res.json({ msg: "Hello from Gateway" });
})

/* Gateway authentication */
app.use('/authentication', authenticationRoute);

/* JWT Validator */
app.use(validateToken);

/* Proxy routing microservices */
app.use('/clipboard', proxy(process.env.MS_CLIPBOARD as string));

app.listen(port, () => {
    console.log(`Clipboard Gateway ${port}.`);
});