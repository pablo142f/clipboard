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

const getSS = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ss = await employeeModel.getSS();
        res.status(200).send(ss);
    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

const getSSOnContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ss = await employeeModel.getSSOnContract();
        res.status(200).send(ss);
    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

const getSSByDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let ss;
        if (!req?.body?.department) {
            res.status(401).send({ msg: "You have to select a department" });
            return;
        }
        if (req?.body?.sub_department) {
            ss = await employeeModel.getSSByDepartmentSubdepartment(req.body.department, req.body.sub_department);
        }else{
            ss = await employeeModel.getSSByDepartment(req.body.department, null);
        }
        console.log(4);
        res.status(200).send(ss);
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
        await employeeModel.deleteEmployee(req.body);
        res.status(200).send({ msg: "Employee deleted successfully." });
    } catch (err: any) {
        res.status(500).send((err as Error).message)
    }
};

module.exports = { getAll, getSS, getSSOnContract, getSSByDepartment, createEmployee, deleteEmployee };