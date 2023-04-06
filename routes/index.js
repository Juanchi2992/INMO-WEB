var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

// Para guardar los archivos de imagen al crear producto uso el paquete multer
var storage = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, 'public/images/producto')
  },
  filename: function(req, file, cb){
      cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET letrado page. */
router.get('/letrado', function(req, res, next) {
  res.render('letrado', { title: 'HOME' });
});

/* GET inmobiliaria page. */
router.get('/inmo', function(req, res, next) {
  res.render('inmo', { title: 'INMO' });
});

/* GET alquiler page. */
router.get('/alquiler',  mainController.alquiler);

/* GET venta page. */
router.get('/venta', mainController.venta);

/* GET nosotros page. */
router.get('/nosotros', function(req, res, next) {
  res.render('nosotros', { title: 'NOSOTROS' });
});

/* GET contacto page. */
router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: 'CONTACTO' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'LOGIN' });
});

/* POST login page. */
router.post('/login', mainController.processLogin);

/* GET crearUsuario page. 
router.get('/crearusuario', function(req, res, next) {
  res.render('crearusuario', { title: 'CREARUSUARIO' });
});*/

/* GET editarUsuario page. */
router.get('/editarusuario', function(req, res, next) {
  res.render('editarusuario', { title: 'EDITARUSUARIO' });
});


/* GET panel de administrador page. */
router.get('/panel', mainController.panel);

/* GET editar page. */
router.get('/editar/:id', mainController.editar);

/* POST editar page. */
router.post('/editar/:id', upload.any(), mainController.actualizar); 

/* GET agregar page. */
router.get('/agregar', function(req, res, next) {
  res.render('agregar', { title: 'agregar' });
});

/* GET agregar page. */
router.post('/agregar', upload.any(), mainController.agregarPropiedad);

/* GET borrar page. */
router.get('/borrar/:id', mainController.borrar);

/* GET propiedad page. */
router.get('/propiedad/:id', mainController.propiedadDetalle);

/* GET search ventas. */
router.get('/searchVenta', mainController.searchVenta);

/* GET search alquileres. */
router.get('/searchAlquiler', mainController.searchAlquiler);

module.exports = router;
