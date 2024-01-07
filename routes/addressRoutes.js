const AddressController = require('../controllers/addressController');
const passport = require('passport');

  module.exports = (app) => {
    // ruta para crear nueva categoria
    app.post('/api/address/create', passport.authenticate('jwt', {session: false}), AddressController.create);
    
    // ruta para obtener toda la lista de direcciones creadas
   app.get('/api/address/findByUser/:id_user', passport.authenticate('jwt', {session: false}), AddressController.findByUser);
    
  }