import { Request, Response, NextFunction } from 'express';
;
const employeeModel = require('../models/employee/employee.controller');

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employees = await employeeModel.getAll();
        res.status(200).send(employees);
    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = await employeeModel.createEmployee(req.body);
        res.status(200).send({ msg: "Employee created successfully." });
    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req?.body?.id) {
            res.status(401).send({ msg: "Employee is required" });
            return;
        }
        await employeeModel.deleteEmployee(req.body);
        res.status(200).send({ msg: "Employee deleted successfully." });
    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

module.exports = { getAll, createEmployee, deleteEmployee };