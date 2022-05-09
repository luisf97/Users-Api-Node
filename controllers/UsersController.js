const { Users } = require('../models/index')
const bcrypt = require('bcrypt')

function UsersController() {
    return {
        async options(_, res){
            return res.status(200).json({
                Date: new Date(),
                Accept: 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:8081/',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',

            })
        },

        async getAllUsers(req, res) {
            
            try {
                const usuarios = await Users.findAll({attributes: {exclude: ['password']}})
                return res.status(200).json(usuarios)

            } catch(err) {
                return res.status(404)
            }
        },

        async getUserById(req, res) {

            const { id } = req.params;

            const usuario = await Users.findOne({attributes: {exclude: ['password']},  where: { id }})

            if(!usuario) return res.status(404).json({status: 404, error: 'Not Found', message: "Usuário não encontrado!", path:req.path }) 

            return res.status(200).json(usuario) 
        },

        async save(req, res) {

            const { name, birthdate, email, password, isAdmin } = req.body;

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const [ user, created ] = await Users.findOrCreate({
                where: { email },
                defaults: {name, birthdate, email, password: hash, isAdmin}
            })

            if(!created) return res.status(202).json({ status: 202, message: "O usuário já existe na base de dados!", path:`/user/${user.id}` }) 

            return res.status(201).json(
                { 
                status:201, 
                message: "Usuário criado com sucesso!", 
                action_links:[{
                    view: `/user/${user.id}`,
                    edit: '/users',
                    delete: `/users/${user.id}`
                }],
                path: req.path,
                data: user,
         })
        },

        async update(req, res) {
            const { id } = req.params
            const { name, birthdate, email, password, isAdmin } = req.body;

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            try {
                await Users.update({ name, birthdate, email, password: hash, isAdmin }, { where: { id }})

                return res.status(200).json({ message: "Usuário atualizado com sucesso!" })

            } catch(err) {
                console.log(err)
                return res.status(400)
            }

        },

        async delete(req, res) {
            const { id } = req.params;

            try {
                const {password, ...user} = await Users.findByPk(id);

                if(user) await Users.destroy({ where: { id }})
                
                return res.status(200).json(
                    { 
                        status: 200,
                        message: "Usuário deletado com sucesso!",
                        path:req.path,
                        data: user
                    })
            }catch(err) {
                return res.status(400).json(
                    {
                    status: 400, 
                    error:'Bad Request', 
                    message: err, 
                    path: req.path})
            }
        }
    }
    
}

module.exports = UsersController