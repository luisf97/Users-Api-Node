const Sequelize = require('sequelize')

// Colocar de acordo com seu mysql

const connection = new Sequelize('usersdb', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = connection;