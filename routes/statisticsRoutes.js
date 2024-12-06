const StatisticsController = require('../controllers/statisticsController');
const passport = require('passport');

  module.exports = (app) => {
    
     app.get('/api/statistics/findReportAgentByIdAndPeriod/:id_agent/:id_reports/:year/:month', passport.authenticate('jwt', {session: false}), StatisticsController.getAgentStatistics);
       
       }