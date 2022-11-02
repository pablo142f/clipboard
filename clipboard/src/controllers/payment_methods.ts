import { Request, Response, NextFunction } from 'express';
const stripe = require('stripe')(process.env.STRIPE_SECRET);

/* Utils */
const customerUtils = require('./utils/customer');

const create = async (req: any, res: Response, next: NextFunction) => {
    try {

        const user = await customerUtils.getCustomerByEmail(req?.user);
        if (user === null) {
            res.status(400).send({ "msg": "Customer not found." });
        } else {
            await stripe.customers.createSource(
                user.id,
                { source: req.body.source }
            ).then(async (result: any) => {
                res.status(200).send({ "msg": "Payment method registered succesfully." });
            }).catch((error: any) => {
                console.log("error", error);
                throw "Error with payment method information";
            });
        }

    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

const get = async (req: any, res: Response, next: NextFunction) => {
    try {

        const user = await customerUtils.getCustomerByEmail(req?.user);
        if (user === null) {
            res.status(400).send({ "msg": "Customer not found." });
        } else {
            await stripe.customers.listSources(
                user.id,
                { object: 'card', limit: 100 }
            ).then(async (result: any) => {
                res.status(200).send({ "msg": "Customer's payment methods.", cards: result?.data });
            }).catch((error: any) => {
                console.log("error", error);
                throw "Error retrieving payment methods";
            });
        }

    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

const remove = async (req: any, res: Response, next: NextFunction) => {
    try {

        const user = await customerUtils.getCustomerByEmail(req?.user);
        if (user === null) {
            res.status(400).send({ "msg": "Customer not found." });
        } else {
            await stripe.customers.deleteSource(
                user.id,
                req.body.cardToken
            ).then(async (result: any) => {
                res.status(200).send({ "msg": "Payment method deleted succesfully." });
            }).catch((error: any) => {
                console.log("error", error);
                throw "Error deleting payment methods";
            });
        }

    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

module.exports = { create, get, remove };