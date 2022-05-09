const routes = require('express').Router()
const Login = require('../controllers/LoginController')

routes.get('/login', Login().login)

module.exports = routes;