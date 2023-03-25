var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

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
router.get('/alquiler', function(req, res, next) {
  res.render('alquiler', { title: 'ALQUILER' });
});

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

/* GET panel de administrador page. */
router.get('/panel', function(req, res, next) {
  res.render('panel', { title: 'PANEL' });
});

/* GET editar page. */
router.get('/editar', function(req, res, next) {
  res.render('editar', { title: 'editar' });
});

/* GET propiedad page. */
router.get('/propiedad', function(req, res, next) {
  res.render('propiedad', { title: 'propiedad' });
});

module.exports = router;
