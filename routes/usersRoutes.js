const UsersController = require('../controllers/userController');
const passport = require('passport');

module.exports = (app, upload) => {
  //Obtener informacion de usuario de la base de datos
  app.get('/api/users/getAll', UsersController.getAll);
  
  //Obtener Datos del usuario con su id
  app.get('/api/users/findById/:id', passport.authenticate('jwt', {session: false}), UsersController.findById);
  //app.get('/api/users/findById/:id', UsersController.findById);
  
  
  app.get('/api/users/findAgent', passport.authenticate('jwt', {session: false}),  UsersController.findAgent);
  
  
  
  // Inserta informacion de  nuevo usuario a la base de datos
  //app.post('/api/users/create', upload.array('image', 1), UsersController.register);
  
  // Crear Nuevo Usuario con Imagen registerWithImage
  app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);
  
  // Crear Nuevo Agente con Imagen registerAgentWithImage
  app.post('/api/users/create/agent', passport.authenticate('jwt', {session: false}), upload.array('image', 1), UsersController.registerAgentWithImage);
  // Login para inicio de sesión
  app.post('/api/users/login', UsersController.login);
  
  // Logout para cierre de sesión
  app.post('/api/users/logout', UsersController.logout);
  
  //Editar Actualizar Perfil de Usuario
  app.put('/api/users/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), UsersController.update);
  //app.put('/api/users/update', upload.array('image', 1), UsersController.update);
}
