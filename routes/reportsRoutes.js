
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
  
    //ruta para obtener lista de todos los reportes módulo inmobiliaria
     app.get('/api/reports/findByTypeReport/:id_reports', passport.authenticate('jwt', {session: false}), ReportsController.findByTypeReport);
     
    //ruta para obtener la lista de reportes del agente y el tipo de reporte del módulo de agente

     app.get('/api/reports/getAgentReportsByTypeAndStartEndPeriod/:id_agent/:id_reports/:start_period/:end_period', passport.authenticate('jwt', {session: false}), ReportsController.getAgentReportsByTypeAndStartEndPeriod);      
    //ruta para obtener todoa los tipos de reporte de agente
     // ruta para obtener toda la lista de categorias de servicios
    app.get('/api/reports/findAgentReportByType', passport.authenticate('jwt', {session: false}), ReportsController.findAgentReportByType);
    
    //Ruta para obtener el año de reporte
    app.get('/api/reports/getReportYears', passport.authenticate('jwt', { session: false }), ReportsController.getReportYears);
    
    
      }
  
