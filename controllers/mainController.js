const db = require('../database/models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const mainController = {
    venta: function(req, res, next){
        db.Propiedades.findAll({
            where: { contrato_id: "2" },
            include: [{association: 'foto', association: 'tipo', association: 'contrato'}],
            raw: true,
            nest: true,
        })
        .then(function(propiedades){
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

        Promise.all([pedidoProp, pedidoTipo])
        .then(function([propiedad, tipos]){
            res.render("editar", {propiedad:propiedad, tipos});
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
        console.log("SEARCH: " + req.query.search)
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
    }
}

module.exports = mainController;