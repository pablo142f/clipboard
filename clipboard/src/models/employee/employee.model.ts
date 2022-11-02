module.exports = (sequelize: any, Sequelize: any) => {
    const Employee = sequelize.define("employee", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING 
        },
        salary: {
            type: Sequelize.FLOAT
        },
        currency: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        oncontract: {
            type: Sequelize.BOOLEAN
        },
        sub_department: {
            type: Sequelize.STRING
        },
    });
    return Employee;
};