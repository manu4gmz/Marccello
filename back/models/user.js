const Sequelize = require('sequelize')
const sequelize = require('../config/db');

const crypto = require('crypto');


class User extends Sequelize.Model { }

User.init({
    type: {
        type: Sequelize.ENUM('superAdmin', 'admin', 'normal'),
        defaultValue: 'normal'
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    address: {
        type: Sequelize.STRING,
        allowNull: true, // EN FASE DE DESARROLLO LO PUSE FALSE YA QUE EN REGISTER NO HAY INPUT PARA ADDRESS, ASI QUE HAY QUE AGREGARLO
        validate: {
            notEmpty: true
        }
    },
    salt: {
        type: Sequelize.STRING
    }
}, {
        sequelize,
        modelName: 'user'
    });


User.beforeCreate((user) => {
    user.salt = crypto.randomBytes(20).toString('hex');

    user.password = crypto.createHmac('sha1', user.salt).update(user.password).digest('hex')
})


User.prototype.validPassword = function (password) {
    const newPassword = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    return newPassword === this.password;
}




module.exports = User;