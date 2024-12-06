const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const session = require('express-session');
const Keys = require('./config/keys');


// Sokects 
const orderDeliverySocket = require('./sockets/orders_delivery_socket');
const statsMetricsSocket = require('./sockets/stats_metrics_socket');

//Mesajes del Sockets
io.on('connection', client => {
  console.log('Cliente Conectado');
  client.on('disconnect', () => { console.log('Cliente Desconectado'); });
  
  client.on('mensaje', (payload) => {
    console.log('Mensaje', payload);
    io.emit('mensaje', {admin: 'Nuevo Mensaje'});
  });
  
  
  client.on('emitir-mensaje', (payload) => {
    console.log('emitir-mensaje', payload);
    io.emit('nuevo-mensaje', 'Nuevo Mensaje para flutter');
  });
  
});
//End of Mesajes del Sockets

//Caperta Public
 const publicPath = path.resolve(__dirname, 'public');
 app.use(express.static(publicPath));


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
const reports = require('./routes/reportsRoutes');
const statistics = require('./routes/statisticsRoutes');

const port = process.env.PORT;
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
statsMetricsSocket(io);

/* Llamando a las Rutas*/
users(app, upload);
categories(app);
address(app);
orders(app);
products(app, upload);
reports(app);
statistics(app);


//Server para Prueba con variables de entorno 

//Server para Prueba Local sin variable de entorno
server.listen(port, '192.168.1.13' || 'localhost', function(err){
   if(err) throw new Error(err);
  console.log('Backend: ' + 'Servidor Corriendo en el puerto:' + ' ' + port + ' PID ' + process.pid + ' ' + '...');});
//Server en Render
 //server.listen(port, '0.0.0.0', function(){console.log('Backend: ' + 'Servidor Corriendo en el puerto:' + ' ' + port + ' PID ' + process.pid + ' ' + '...');});


// Configuracion de Prueba para Postman de ruta raiz
//Si se realiza una consulta con la url mas la ruta muestra los mensajes que acontinuacion muestra app.get
app.get('/', (req, res) => {
  //Enviamos Respuesta con un mensaje
  res.send('Ruta de prueba Raiz del Backend');
});
//Otra Ruta de Prueba con Test de mensaje
app.get('/test', (req, res) => {
  res.send('Ruta Raiz de Test');
});
// End of Configuracion de Prueba para Postman de ruta raiz

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
