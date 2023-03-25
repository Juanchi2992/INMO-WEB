const Sequelize = require('sequelize');
const op = Sequelize.Op;
const db = require('../database/models');

const mainController = {
    venta: function(req, res, next){
        db.Propiedades.findAll({
            include: [{association: 'foto', association: 'tipo'}],
            raw: true,
            nest: true,
        })
        .then(function(propiedades){
            res.render("venta", { propiedades })
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

module.exports = mainController;