var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/*login administrador
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const email = "juan@gmail.com";
  const password = 1234;

  // Verificar si se ingresaron los datos necesarios
  if (!email) {
    return res.render('login', { emailError: 'Dato necesario' });
  }
  if (!password) {
    return res.render('login', { passwordError: 'Dato necesario' });
  }

  // Verificar si los datos ingresados son correctos
  if (email !== 'usuario@example.com' || password !== 'contraseña') {
    return res.render('login', { loginError: 'Los datos proporcionados no son correctos' });
  }

  // Si los datos son correctos, redirigir a la página de panel
  res.redirect('/panel');
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
