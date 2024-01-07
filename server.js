const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const session = require('express-session');
const Keys = require('./config/keys');
const io = require('socket.io')(server);

// Sokects 
const orderDeliverySocket = require('./sockets/orders_delivery_socket');




/*Inicializando Firebase Admin*/
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
  storage: multer.memoryStorage()
})



/* Rutas */
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes.js');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');
const orders = require('./routes/ordersRoutes');





const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded(
  {
    extended: true
  }
));
app.use(cors());
app.use(session({
  secret: Keys.secretOrKey,
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);



app.disable('x-powered-by');

app.set('port', port);

/* Llamando al socket*/
orderDeliverySocket(io);
/* Llamando a las Rutas*/
users(app, upload);
categories(app);
address(app);
orders(app);
products(app, upload);


server.listen(port, '192.168.100.2' || 'localhost', function(){
  console.log('Backend: ' + 'Servidor Corriendo en el puerto:' + ' ' + port + ' PID ' + process.pid + ' ' + '...');
});


app.get('/', (req, res) => {
  res.send('Ruta Raiz del Backend');
});

app.get('/test', (req, res) => {
  res.send('Ruta Raiz de Test');
});


//Manejador de Errores
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

module.exports = {
  app: app,
  server: server
}


// 200 = Respuesta Exitosa
// 201 = Consulta Exotosa con mesaje json
// 404 = Significa La URL no exite
// 500 = Error Interno del Servidor Error de Código
// 501 = El metodo solicitado no esta soportado por el servidor y no puede ser manejado. Los unicos metodos que los servidores requieren soporte (y por lo tanto no deben retornar este codigo) son: GET y HEAD.

// Comillas Backticks `````` //