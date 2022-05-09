const express = require('express')
const app = express()
const morgan = require('morgan')
const Router = require('./config/app')
const connection = require('./database/connection')


app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.use(morgan('tiny'))

Router(app)

connection
    .authenticate()
    .then(() => console.log('Connected with database'))
    .catch(err => console.log(err))

app.listen(8081, () => console.log('Server is running on port 8081'))