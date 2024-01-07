const CategoriesController = require('../controllers/categoriesController');
const passport = require('passport');

  module.exports = (app) => {
    // ruta para crear nueva categoria
    app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), CategoriesController.create);
    // ruta para obtener toda la lista de categorias de servicios
    app.get('/api/categories/getAll', passport.authenticate('jwt', {session: false}), CategoriesController.getAll);
    
  }