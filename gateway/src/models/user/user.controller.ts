const database = require("../index");
const User = database.user;
const Op = database.Sequelize.Op;

exports.getUserByEmail = async (user: any) => {
    return await User.findOne({ where: { email: user.email } }).catch((err:any)=>{
        throw err;
    });
};

exports.createUser = async (user: any) => {
    return await User.create(user).catch((err:any)=>{
        throw err;
    });
};