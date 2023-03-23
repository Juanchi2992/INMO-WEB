const Sequelize = require('sequelize');
const op = Sequelize.Op;

const mainController = {
    venta: function(req, res, next){
        console.log("VENTAS")
        res.render("venta")
    }
}

module.exports = mainController;