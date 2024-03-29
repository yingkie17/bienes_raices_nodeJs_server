
const ReportsController = require('../controllers/reportsController');
const passport = require('passport');

  module.exports = (app) => {
    // ruta para crear el tipo de reporte
    app.post('/api/reports/create', passport.authenticate('jwt', {session: false}), ReportsController.create);
    //ruta para crear el reporte de lado del cliente
    app.post('/api/reports/addReport', passport.authenticate('jwt', {session: false}), ReportsController.addReport);
    
    //ruta para crear el reporte de lado del usuario
     app.post('/api/reports/addReportClient', passport.authenticate('jwt', {session: false}), ReportsController.addReportClient);
    
      //ruta para crear el reporte para cliente usuario nuevo 
    app.post('/api/reports/addReportRegisterClient', ReportsController.addReportRegisterClient);
    //ruta para obtener todos los reportes generados
    app.get('/api/reports/getAllReporstsHasReport', passport.authenticate('jwt', {session: false}), ReportsController.getAllReportsHasReport);
    //ruta para obtener la lista de tipos de reportes
     // ruta para obtener toda la lista de categorias de servicios
    app.get('/api/reports/getAllReports', passport.authenticate('jwt', {session: false}), ReportsController.getAllReports);
  
    //ruta para traer lista de reportes
     app.get('/api/reports/findByTypeReport/:id_reports', passport.authenticate('jwt', {session: false}), ReportsController.findByTypeReport);
        
              
  }
  
