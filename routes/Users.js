const routes = require('express').Router()
const Users = require('../controllers/UsersController')


routes.get('/', Users().getAllUsers)
routes.get('/:id', Users().getUserById)
routes.post('/', Users().save)
routes.put('/:id', Users().update)
routes.delete('/:id', Users().delete)
routes.options('/', Users().options)

module.exports = routes;