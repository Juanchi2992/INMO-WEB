const db = require('../database/models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const userController = {
    editarUsuario: function(req,res,next){
        db.Usuarios.findOne({
            where: { id: req.params.id}
        })
        .then(usuario => {
            res.render('editarusuario', { usuario })
        })
    },

    actualizarUsuario: function(req,res,next){
        db.Usuarios.update({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.new-password
        },{
            where: { id: req.params.id},
            returning: true
        })
        .then(function(){
            res.redirect('/')
        })
        .catch(e => {console.log(e)})
    }

}

module.exports = userController;