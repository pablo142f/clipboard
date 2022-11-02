import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');

const setUser = (req: any, res: Response, next: NextFunction) => {
    // Get Access Token <Bearer> through request header
    const authHeader = req.headers["authorization"]
    if (authHeader == null) { throw "Not accessible"; }
    const token = authHeader.split(" ")[1]
    // Split the <Bearer> Token to get the token key
    if (token == null) { throw "No permissions to access this resource"; }
    // JWT Verification of the Access Token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err:any, user:any) => {
        if (err) { throw "Not accessible"; }
        else {
            req.user = user;
            next(); // Proceed to the next action in the calling function
        }
    });
};

export { setUser };