const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

  module.exports = (app) => {
    // ruta para crear nueva order
    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), OrdersController.create);
    
   app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatus);
   app.get('/api/orders/findByAgentAndStatus/:id_agent/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByAgentAndStatus); 
   app.get('/api/orders/findByClientAndStatus/:id_client/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByClientAndStatus); 
    
   app.put('/api/orders/updateTicketToCurso', passport.authenticate('jwt', { session: false }), OrdersController.updateTicketToCurso);
   app.put('/api/orders/updateTicketToNegociacion', passport.authenticate('jwt', { session: false }), OrdersController.updateTicketToNegociacion);
   app.put('/api/orders/updateTicketToConcretado', passport.authenticate('jwt', { session: false }), OrdersController.updateTicketToConcretado);
   app.put('/api/orders/updateTicketToCancelado', passport.authenticate('jwt', { session: false }), OrdersController.updateTicketToCancelado);
   app.put('/api/orders/updateLatLng', passport.authenticate('jwt', { session: false }), OrdersController.updateLatLng);
    
  }