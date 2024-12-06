const Statistics= require('../models/statistics');
const Reports = require('../models/reports');
const ReporstsHasReport = require('../models/reports_has_report');
const User = require('../models/user');


module.exports = { 
  
  
  // Método para obtener estadísticas de reportes de un agente en un periodo mensual
async getAgentStatistics(req, res, next) {
  try {
    const data = req.params;
    

    //Verificar si el Agente existe
    
    const idAgentExists = await User.findReportsAgentById(data.id_agent);
    if (!idAgentExists) {
      console.log('No se pudo obtener el id de agente inmobiliario del modulo de satistics');
      return res.status(404).json({
        message: 'El agente inmobiliario no existe o es invalido',
        success: false
      });
    }
    
    
// Validar si existe el tipo de Rerporte    
const typeReportExists = await Reports.findReportById(data.id_reports);
const yearPeriodReports = await ReporstsHasReport.findReportAgentByIdAndPeriodYear(data.id_agent, data.year);
const monthPeriodReports = await ReporstsHasReport.findReportAgentByIdAndPeriodMonth(data.id_agent, data.month);


if (!typeReportExists) {
  console.log('El tipo o categoría de reporte no existe');
  return res.status(404).json({
    message: 'El tipo o categoría de reporte no existe',
    success: false
  });
}

if (yearPeriodReports.length === 0 && monthPeriodReports.length === 0) {
  console.log('El periodo en el año y el mes introducido no contiene reportes');
  return res.status(404).json({
    message: 'El periodo en el año y el mes introducido no contiene reportes',
    success: false
  });
}

if (yearPeriodReports.length === 0) {
  console.log('El año del periodo introducido no contiene reportes');
  return res.status(404).json({
    message: 'El año del periodo introducido no contiene reportes',
    success: false
  });
}


if (monthPeriodReports.length === 0) {
  console.log('El mes del periodo introducido no contiene reportes');
  return res.status(404).json({
    message: 'El mes del periodo introducido no contiene reportes',
    success: false
  });
}

// Obtener los reportes del agente para el mes especificado
const agentReportsExists = await ReporstsHasReport.getAgentReportsByType(data.id_agent, data.id_reports, data.year, data.month);

if (!agentReportsExists) {
  console.log('No se pudo obtener la lista de Reportes según el tipo de reporte, según el agente, según el periodo');
  return res.status(404).json({
    message: 'No se pudo obtener la lista de Reportes según el tipo de reporte, según el agente, según el periodo',
    success: false
  });
}

// Devolver una respuesta exitosa con la lista de reportes si existen
return res.status(200).json({
  message: 'El agente tiene reportes en el período especificado',
  success: true,
  reports: agentReportsExists, // Aquí incluyes los detalles de los reportes
  data: data,
});
      
  
  
  
  } catch (error) {
    console.log(`Error al generar y guardar las estadísticas: ${error}`);
    return res.status(500).json({
      message: 'Se produjo un error al generar y guardar las estadísticas',
      success: false,
      error: error.message
    });
  }
}  
  
  
}