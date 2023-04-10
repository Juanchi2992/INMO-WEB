var { check, validationResult, body } = require('express-validator');
const db = require('../database/models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const bcrypt = require('bcrypt');

const mainController = {
    venta: function(req, res, next){
        db.Propiedades.findAll({
            where: { contrato_id: "2" },
            include: [{ association: 'tipo', association: 'contrato', association: 'foto'}],
            raw: true,
            nest: true,
        })
        .then(function(propiedades){
            propiedades.forEach(propiedad => {
                
            })
            res.render("venta", { propiedades })
        })
        .catch(function(error){
            console.log(error);
        })
    },

    alquiler: function(req, res, next){
        db.Propiedades.findAll({
            where: { contrato_id: "1" },
            include: [{association: 'foto', association: 'tipo', association: 'contrato'}],
            raw: true,
            nest: true,
        })
        .then(function(propiedades){
            res.render("alquiler", { propiedades })
        })
        .catch(function(error){
            console.log(error);
        }) 
    },

    alquilerTemp: function(req, res, next){
        db.Propiedades.findAll({
            where: { contrato_id: "3" },
            include: [{association: 'foto', association: 'tipo', association: 'contrato'}],
            raw: true,
            nest: true,
        })
        .then(function(propiedades){
            res.render("alquilertemporario", { propiedades })
        })
        .catch(function(error){
            console.log(error);
        }) 
    },

    propiedadDetalle: function(req, res, next){
        db.Propiedades.findByPk(req.params.id, {
            include: { all: true }
        })
        .then(function(propiedad){
            res.render("propiedad", {propiedad})
        })
    },



    panel: function(req, res, next){
        db.Propiedades.findAll({
            include: [{association: 'tipo'}],
            raw: true,
            nest: true,
        })
        .then(function(propiedades){
            res.render("panel", { propiedades })
        })
        .catch(function(error){
            console.log(error);
        }) 
    },

    editar: function(req, res, next){
        
        let pedidoProp = db.Propiedades.findByPk(req.params.id);
        let pedidoTipo = db.Tipos.findAll();
        let pedidoContrato = db.Contratos.findAll();
        
        Promise.all([pedidoProp, pedidoTipo, pedidoContrato])
        .then(function([propiedad, tipos, contratos]){
            res.render("editar", {propiedad:propiedad, tipos, contratos});
        });
    },

    actualizar: function(req, res, next){
        if(req.files[0]){
            db.Propiedades.update({
                nombre: req.body.titulo,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                tipo_id: req.body.tipo,
                habitaciones: req.body.habitaciones,
                contrato_id: req.body.contrato,
                banos: req.body.banos,
                m2: req.body.m2,
                direccion: req.body.direccion
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                res.redirect("/venta")
            })
            .catch(e => {console.log(e)})
        }
        else{
            db.Propiedades.update({
                nombre: req.body.titulo,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                tipo_id: req.body.tipo,
                habitaciones: req.body.habitaciones,
                contrato_id: req.body.contrato,
                banos: req.body.banos,
                m2: req.body.m2,                
                direccion: req.body.direccion
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                res.redirect("/panel")
            })
            .catch(e => {console.log(e)})
        }
        
        
    },

    agregarPropiedad: function(req, res, next) {
        db.Propiedades.create({
            nombre: req.body.titulo,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            tipo_id: req.body.tipo,
            habitaciones: req.body.habitaciones,
            contrato_id: req.body.contrato,
            banos: req.body.banos,
            m2: req.body.m2,            
            direccion: req.body.direccion
        })
        .then(function(Propiedad){
            res.redirect('/panel')
            .catch(e=>{console.log(e)}) 
        })
        .catch(function(error){
            console.log(error)
        });
          
    },

    borrar: function(req, res, next){
        db.Fotos.destroy({
            where:{
                propiedad_id: req.params.id
            }
        })
        .then(function(Foto){
            db.Propiedades.destroy({
                where:{
                    id: req.params.id
                }
        })
        .then(function(Propiedad){
            res.redirect('/panel')            
            .catch(e=>{console.log(e)})
        })
        .catch(function(error){
            console.log(error)
        });
        
        })
        
    },


    searchVenta: function(req, res, next){
        const search = req.query.search        
        db.Propiedades.findAll({
            where: {
                nombre: {
                    [op.like]: '%'+ search +'%' 
                },
                contrato_id: 2
            }
        })
        .then(propiedades=>{
            console.log(search);
            res.render("venta", {search, propiedades});                
        })
        .catch(e => {console.log(e)})
    },

    searchAlquiler: function(req, res, next){
        const search = req.query.search        
        db.Propiedades.findAll({
            where: {
                nombre: { [op.like]: '%'+ search +'%' }, contrato_id: 1
            }
        })
        .then(propiedades=>{
            console.log(search);
            res.render("alquiler", {search, propiedades});                
        })
        .catch(e => {console.log(e)})
    },
    
    login: function(req,res,next) {
        res.render("login");
        },

    processLogin: function(req,res,next){
        var errors = validationResult(req);

        // Si no hay errores, busco en la base de datos un usuario con el email que esta intentando loguearse
        if(errors.isEmpty()){
            db.Usuarios.findOne({
                where: { email: req.body.email }
            })
            .then(function(usuario){
                console.log(usuario.password + " " + req.body.password)
                // Si es undefined (no existe un usuario con ese email) devuelvo el mensaje explicandolo
                if(usuario == undefined){
                    console.log("No existe un usuario con ese email")
                    res.render("login", { errors: [ {msg: 'No existe un usuario con ese email'}] })
                }
                // Si encuentro un usuario que coincida, comparo las contrasenas
                else{
                    // Si la contrasena es correcta guardo al usuario en session
                    if(req.body.password == usuario.password){
                        console.log(req.session)
                        req.session.usuarioLogueado = usuario;

                        // Si clickeo el boton de recordame, guardo al usuario en cookie tambien
                        if(req.body.recordame != undefined){
                            res.cookie('recordame', req.session.usuarioLogueado.email, { maxAge: 60000 })
                        }

                        // Una vez terminado el login redirecciono al home
                        res.redirect('/panel')
                    }
                    // Si la contrasena es incorrecta devuelvo el mensaje
                    else{
                        console.log("La contraseña es incorrecta")
                        res.render("login", { errors: [ {msg: 'La contraseña es incorrecta'}] })
                    }
                }                                             
                
            })
            .catch(e => {
                console.log(e)
            })
        }
        else{
            return res.render("panel", { errors: errors.errors, usuarioLogueado: req.session.usuarioLogueado })
        }
    },
}

module.exports = mainController;