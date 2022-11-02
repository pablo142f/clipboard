const Sequelize2 = require("sequelize");
const database = require("../index");
const Employee = database.employee;
const Op = database.Sequelize.Op;

exports.getAll = async (employee: any) => {
    return await Employee.findAll().catch((err: any) => {
        throw err;
    });
};

exports.getSS = async () => {
    return await Employee.findAll({
        attributes: [
            [Sequelize2.fn('min', Sequelize2.col('salary')), 'minSalary'],
            [Sequelize2.fn('max', Sequelize2.col('salary')), 'maxSalary'],
            [Sequelize2.fn('avg', Sequelize2.col('salary')), 'avgSalary']
        ],
    }).catch((err: any) => {
        throw err;
    });
};

exports.getSSOnContract = async () => {
    return await Employee.findAll({
        where: { oncontract: true },
        attributes: [
            [Sequelize2.fn('min', Sequelize2.col('salary')), 'minSalary'],
            [Sequelize2.fn('max', Sequelize2.col('salary')), 'maxSalary'],
            [Sequelize2.fn('avg', Sequelize2.col('salary')), 'avgSalary']
        ],
    }).catch((err: any) => {
        throw err;
    });
};

exports.getSSByDepartment = async (department: string) => {
    return await Employee.findAll({
        where: { department: department },
        attributes: [
            [Sequelize2.fn('min', Sequelize2.col('salary')), 'minSalary'],
            [Sequelize2.fn('max', Sequelize2.col('salary')), 'maxSalary'],
            [Sequelize2.fn('avg', Sequelize2.col('salary')), 'avgSalary']
        ],
    }).catch((err: any) => {
        throw err;
    });
};

exports.getSSByDepartmentSubdepartment = async (department: string, sub_department: string) => {
    return await Employee.findAll({
        where: { department: department, sub_department: sub_department },
        attributes: [
            [Sequelize2.fn('min', Sequelize2.col('salary')), 'minSalary'],
            [Sequelize2.fn('max', Sequelize2.col('salary')), 'maxSalary'],
            [Sequelize2.fn('avg', Sequelize2.col('salary')), 'avgSalary']
        ],
    }).catch((err: any) => {
        throw err;
    });
};

exports.createEmployee = async (employee: any) => {
    return await Employee.create(employee).catch((err: any) => {
        throw err;
    });
};

exports.deleteEmployee = async (employee: any) => {
    return await Employee.destroy({ where: { id: employee.id } }).catch((err: any) => {
        throw err;
    });
};