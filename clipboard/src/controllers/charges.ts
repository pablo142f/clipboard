import { Request, Response, NextFunction } from 'express';
const stripe = require('stripe')(process.env.STRIPE_SECRET);

/* Utils */
const customerUtils = require('./utils/customer');

const create = async (req: any, res: Response, next: NextFunction) => {
    try {

        const { amount, source, currency } = req.body;
        const user = await customerUtils.getCustomerByEmail(req?.user);

        await stripe.charges.create({
            amount,
            source,
            customer: user.id,
            currency,
            description: "clipboard"
        }).then(async (charge: any) => {
            res.status(200).send({ "msg": "Payment successful." });
        }).catch((error: any) => {
            console.log(error);
            throw "Error trying to make the payment, please retry later";
        });

    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

module.exports = { create };