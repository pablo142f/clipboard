import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');

const generateAccessToken = async (user: any) => {
    return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "24h" });
};

const generateRefreshToken = async (user: any) => {
    return await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "48h" });
};

const bCryptPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

const bCryptCompare = async (password: string, userPassword: string) => {
    return await bcrypt.compare(password, userPassword);
};

const validateToken = (req: any, res: Response, next: NextFunction) => {
    // Get Access Token <Bearer> through request header
    const authHeader = req.headers["authorization"]
    if (authHeader == null) { throw "Not accessible"; }
    const token = authHeader.split(" ")[1]
    // Split the <Bearer> Token to get the token key
    if (token == null) { throw "No permissions to access this resource"; }
    // JWT Verification of the Access Token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) { throw "Not accessible"; }
        else {
            req.user = user;
            next(); // Proceed to the next action in the calling function
        }
    });
};

export { generateAccessToken, generateRefreshToken, bCryptPassword, bCryptCompare, validateToken };