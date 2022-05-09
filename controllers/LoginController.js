const { Users } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = 'luisf'

function LoginController() {
    return {

        async login(req, res) {

            const { email, password } = req.body;

            const usuario = await Users.findOne({ where: { email }})

            if(!usuario) console.log('O email não existe!')
            else {
                const passwordIsOk = bcrypt.compareSync(password, usuario.password)

                if (passwordIsOk) {
                    const token = jwt.sign({ email }, SECRET, { expiresIn: 120})
                    return res.json({auth: true, token})
                }
                else console.log('Os dados inseridos estão incorretos')
            }
            

        }
    }
}

module.exports = LoginController;