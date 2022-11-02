module.exports = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING 
        },
        phone: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        stripe_customer_id: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });
    return User;
};