import { Request, Response, NextFunction } from 'express';

import {
    generateAccessToken,
    generateRefreshToken,
    bCryptPassword,
    bCryptCompare
} from '../utils/authentication';

const { UserLogin } = require('../models/authentication');
const userModel = require('../models/user/user.controller');

// const userSchema = require('../../prisma/operations/user');

const registration = async (req: Request, res: Response, next: NextFunction) => {
    try {

        req.body.email = req.body.email.toString().trim().toLowerCase();
        req.body.password = await bCryptPassword(req.body.password);
        const user = await userModel.getUserByEmail(req.body);

        if (user != null) { res.status(400).send("Account already exists"); return; }

        const { name, email, phone, id } = await userModel.createUser(req.body);
        let newUser: typeof UserLogin = {};
        newUser.accessToken = await generateAccessToken({ email: newUser.email, id, name, phone });
        newUser.refreshToken = await generateRefreshToken({ email: newUser.email, id, name, phone });
        res.status(200).send(newUser);

    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {

        req.body.email = req.body.email.toString().trim().toLowerCase();
        const usuario = await userModel.getUserByEmail(req.body) || {};
        const { name, email, phone, password, id } = await userModel.getUserByEmail(req.body) || {};

        if (email == null) { res.status(400).send("Account not found"); return; }

        let newUser: typeof UserLogin = {};
        if (await bCryptCompare(req.body.password, password)) {
            newUser.accessToken = await generateAccessToken({ email: newUser.email, id, name, phone });
            newUser.refreshToken = await generateRefreshToken({ email: newUser.email, id, name, phone });
            res.status(200).send(newUser);
            return;
        }
        res.status(404).send("Incorrect password");

    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

module.exports = { registration, login };