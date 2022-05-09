const Users = require('../routes/Users')
const Login = require('../routes/Login')

const verifyContentType = require('../middleware/verifyContentType')

//Colocar a middlware na rota

function initializeRoutes(app) {
    app.use('/users', Users)
    app.use('/', Login)
}

module.exports = initializeRoutes;