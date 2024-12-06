
const Reports = require('../models/reports');
const Product = require('../models/product'); 
const User = require('../models/user');
const ReporstsHasReport = require('../models/reports_has_report');


module.exports = {
  
async create(req, res, next) {
    try{
      //vamos a capturar la data que trae el formulario desde flutter
      const reports = req.body;
       const formattedData = JSON.stringify(reports, null, 1).replace(/,/g, ',\n');
      //una vez se obtiene los datos, vamos a ejecutar la tarea que va crear los datos en la base de datos
          //la instruccion va llamar al modelo con el metodo y va pasar por parametro reports que se obtiene del body
          const data = await Reports.create(reports);
          
       
      console.log(formattedData);
      //vamos a retornar un mensaje 201 al response api flutter 
      return res.status(201).json({
        message: 'Se generó nuevo reporte',
        success: true,
        data: data.id
      });
      
    }
    catch(error){
      console.log(`Se produjo un error en el método de crear reportes en reportsController, Error: ${error}`);
    return res.status(501).json({
      message: 'Se produjo un error en el método de crear reportes en reportsController',
      success: false,
      error: error
    });
    }
    
  },
  
  
  //Método para obtener todos los reportes generados
async getAllReportsHasReport(req, res, next){
   
  try{
    console.log(`\n ===== Método para obtener todos los reportes generados ===== \n`);
    const data = await ReporstsHasReport.getAllReportsHasReport();
     const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ===== //Método para obtener todos los reportes generados ===== \n`);
    return res.status(201).json(data);
  }
  catch(error){
    console.error(`Se produjo un error al obtener la lista de todos los reportes generados, Error ${error}`);
    return  res.status(501).json({
      message: `Se produjo un error al obtener la lista de todos los reportes generados, Error ${error}`,
        success: false,
        error: error
    });
  }
},
   
  
    //Método para obtener todas los tipos de reportes
async getAllReports(req, res, next){
  try{
    console.log(`\n ===== Método para obtener tipos de reportes ===== \n`);
    const data = await Reports.getAllReports();
     const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ===== //Método para obtener tipos de reportes ===== \n`);
    return res.status(201).json(data);
  }
  catch(error){
    console.error(`Se produjo un error al obtener la lista de tipos de reportes, Error ${error}`);
    return  res.status(501).json({
      message: `Se produjo un error al obtener la lista de tipos de reportes, Error ${error}`,
        success: false,
        error: error
    });
  }
},
   
//Método para generar reporte cuando se registra nuevo cliente cuando no este logueado con ninguna cuenta
  
  async addReportRegisterClient(req, res, next) {
  try {
    console.log('\n======= Método para generar reporte =======\n');

    // Obtener el objeto de reporte de la solicitud
    const reportData = req.body;

    // Verificar la existencia del tipo de reporte
    const typeReportExists = await Reports.findReportById(reportData.id_reports);
    if (!typeReportExists) {
      console.log('El tipo de reporte especificado no existe');
      return res.status(404).json({
        message: 'El tipo de reporte especificado no existe',
        success: false
      });
    }


    // Aquí puedes procesar y guardar el reporte en la base de datos según tus necesidades
    console.log('Datos del reporte:', reportData);
    const data = await ReporstsHasReport.addReport(reportData);
    // Puedes devolver una respuesta exitosa si el reporte se guarda correctamente
    return res.status(201).json({
      message: 'Se generó un nuevo reporte',
      success: true,
      data: reportData.id  // Puedes devolver el reporte creado si es necesario
    });

  } catch (error) {
    console.log(`Se produjo un error en el método addReport al registrar un reporte en reportsController, Error: ${error}`);
    return res.status(500).json({
      message: 'Se produjo un error al realizar el registro del reporte',
      success: false,
      error: error.message
    });
  }
},
  
  
  //Método para generar reporte del lado del Agente
  
  async addReport(req, res, next) {
  try {
    console.log('\n======= Método para generar reporte =======\n');

    // Obtener el objeto de reporte de la solicitud
    const reportData = req.body;

    // Verificar la existencia del tipo de reporte
    const typeReportExists = await Reports.findReportById(reportData.id_reports);
    if (!typeReportExists) {
      console.log('El tipo de reporte especificado no existe');
      return res.status(404).json({
        message: 'El tipo de reporte especificado no existe',
        success: false
      });
    }

    
    // Verificar la existencia del agente
    const agentReportExists = await User.findAgentReportById(reportData.id_agent);
    if (!agentReportExists) {
      console.log('El id del agente especificado que generó el reporte no existe');
      return res.status(404).json({
        message: 'El id del agente especificado que generó el reporte no existe',
        success: false
      });
    }

    // Aquí puedes procesar y guardar el reporte en la base de datos según tus necesidades
    console.log('Datos del reporte:', reportData);
    const data = await ReporstsHasReport.addReport(reportData);
    // Puedes devolver una respuesta exitosa si el reporte se guarda correctamente
    return res.status(201).json({
      message: 'Se generó un nuevo reporte',
      success: true,
      data: reportData.id  // Puedes devolver el reporte creado si es necesario
    });

  } catch (error) {
    console.log(`Se produjo un error en el método addReport al registrar un reporte en reportsController, Error: ${error}`);
    return res.status(500).json({
      message: 'Se produjo un error al realizar el registro del reporte',
      success: false,
      error: error.message
    });
  }
},
  
  
  
  //Método para generar reporte de lado del cliente
  
  async addReportClient(req, res, next) {
  try {
    console.log('\n======= Método para generar reporte =======\n');

    // Obtener el objeto de reporte de la solicitud
    const reportData = req.body;

    // Verificar la existencia del tipo de reporte
    const typeReportExists = await Reports.findReportById(reportData.id_reports);
    if (!typeReportExists) {
      console.log('El tipo de reporte especificado no existe');
      return res.status(404).json({
        message: 'El tipo de reporte especificado no existe',
        success: false
      });
    }

    
    // Verificar la existencia del usuario
    const userReportExists = await User.findUserReportById(reportData.id_user);
    if (!userReportExists) {
      console.log('El usuario especificado que generó el reporte no existe');
      return res.status(404).json({
        message: 'El usuario especificado que generó el reporte no existe',
        success: false
      });
    }


    // Aquí puedes procesar y guardar el reporte en la base de datos según tus necesidades
    console.log('Datos del reporte:', reportData);
    const data = await ReporstsHasReport.addReport(reportData);
    // Puedes devolver una respuesta exitosa si el reporte se guarda correctamente
    return res.status(201).json({
      message: 'Se registró un nuevo reporte',
      success: true,
      data: reportData.id  // Puedes devolver el reporte creado si es necesario
    });

  } catch (error) {
    console.log(`Se produjo un error en el método addReport al registrar un reporte en reportsController, Error: ${error}`);
    return res.status(500).json({
      message: 'Se produjo un error al realizar el registro del reporte',
      success: false,
      error: error.message
    });
  }
},
  
  // Listar Reportes 
  
async findByTypeReport(req, res, next) {
  
  try{
    const id_reports = req.params.id_reports;
    const data = await ReporstsHasReport.findByTypeReport(id_reports);   
   
    
return res.status(200).json({
  message: 'Se econtró reportes en el periodo especificado',
  success: true,
  reports: data,
  data: data,

});
  }
  catch(error){
    console.log(`Error al traer la lista de reportes, Error: ${error}`);
    return res.status(501).json({
      message: `Error al traer lista de reportes: ${error}`,
      success: false,
      error: error
    });
  }
},
  
  
  
  //Método para obtener reportes del agente segun el tipo y el periodo
   
async getAgentReportsByType(req, res, next) {
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
  console.log('---El tipo o categoría de reporte no existe---');
  return res.status(404).json({
    message: 'El tipo o categoría de reporte no existe',
    success: false
  });
}

if (yearPeriodReports.length === 0 && monthPeriodReports.length === 0) {
  console.log('---El periodo en el año y el mes introducido no contiene reportes---');
  return res.status(404).json({
    message: 'El periodo en el año y el mes introducido no contiene reportes',
    success: false
  });
}

if (yearPeriodReports.length === 0) {
  console.log('---El año del periodo introducido no contiene reportes---');
  return res.status(404).json({
    message: 'El año del periodo introducido no contiene reportes',
    success: false
  });
}


if (monthPeriodReports.length === 0) {
  console.log('---El mes del periodo introducido no contiene reportes---');
  return res.status(404).json({
    message: 'El mes del periodo introducido no contiene reportes',
    success: false
  });
}

// Obtener los reportes del agente para el mes especificado
const agentReportsExists = await ReporstsHasReport.getAgentReportsByType(data.id_agent, data.id_reports, data.year, data.month);

if (!agentReportsExists) {
  console.log('---No se pudo obtener la lista de Reportes según el tipo de reporte, según el agente, según el periodo---');
  return res.status(404).json({
    message: 'No se pudo obtener la lista de Reportes según el tipo de reporte, según el agente, según el periodo',
    success: false
  });
}

// Devolver una respuesta exitosa con la lista de reportes si existen
return res.status(200).json({
  message: '---El agente tiene reportes en el período especificado---',
  success: true,
  reports: agentReportsExists, // Aquí incluyes los detalles de los reportes
  data: data,
});
      
  
  
  
  } catch (error) {
    console.log(`---Error al generar y guardar las estadísticas: ${error}---`);
    return res.status(500).json({
      message: 'Se produjo un error al generar y guardar las estadísticas',
      success: false,
      error: error.message
    });
  }
},
  
  
//Método para obtner todos los tipos de reportes de agente
          
  async findAgentReportByType(req, res, next) { 
    
     try{
    const data = await Reports.findAgentReportByType();
    return res.status(201).json(data);
  }
  catch(error){
    console.error(`Se produjo un error al obtener reportes de agente según el tipo de reporte, Error ${error}`);
    return  res.status(501).json({
        message: `Se produjo un error al obtener reportes de agente según el tipo de reporte, Error ${error}`,
        success: false,
        error: error
    });
  }
    
  },
  
  //Método para obtner el año de reporte
  
  async getReportYears(req, res, next) {
  try {
    const years = await ReporstsHasReport.getReportYears();

    return res.status(200).json(years);
  } catch (error) {
    console.error(`Error al obtener los años de los reportes: ${error}`);
    return res.status(500).json({
      message: 'Se produjo un error al obtener los años de los reportes',
      success: false,
      error: error.message
    });
  }
},
  
  
//------------------------------Método para obtener reportes de agente según id de agente, según id de tipo de reporte, según el año, segun el mes,  
  
async getAgentReportsByTypeAndPeriod(req, res, next) {
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
  console.log('---El tipo o categoría de reporte no existe---');
  return res.status(404).json({
    message: 'El tipo de reporte no existe',
    success: false
  });
}

if (yearPeriodReports.length === 0 && monthPeriodReports.length === 0) {
  console.log('---El periodo en el año y el mes introducido no contiene reportes---');
  return res.status(404).json({
    message: 'El periodo en el año y el mes introducido no contiene reportes',
    success: false
  });
}

if (yearPeriodReports.length === 0) {
  console.log('---El año del periodo introducido no contiene reportes---');
  return res.status(404).json({
    message: 'El año del periodo introducido no contiene reportes',
    success: false
  });
}


if (monthPeriodReports.length === 0) {
  console.log('---El mes del periodo introducido no contiene reportes---');
  return res.status(404).json({
    message: 'El mes del periodo introducido no contiene reportes',
    success: false
  });
}

// Obtener los reportes del agente para el mes especificado
const agentReportsExists = await ReporstsHasReport.getAgentReportsByTypeAndPeriod(data.id_agent, data.id_reports, data.year, data.month);

if (!agentReportsExists) {
  console.log('---No se pudo obtener la lista de Reportes según el tipo de reporte, según el agente, según el periodo---');
  return res.status(404).json({
    message: 'No se pudo obtener la lista de Reportes según el tipo de reporte, según el agente, según el periodo',
    success: false
  });
}

// Devolver una respuesta exitosa con la lista de reportes si existen
return res.status(200).json({
  message: '---El agente tiene reportes en el período especificado---',
  success: true,
  reports: agentReportsExists,
  data: data,
  
});
      
  
  } catch (error) {
    console.log(`---Error al generar y guardar las estadísticas: ${error}--- `);
    return res.status(500).json({
      message: 'Se produjo un error al generar y guardar las estadísticas',
      success: false,
      error: error.message
    });
  }
},  
  
  
  
  


  
 /*---- Consulta para obtener reportes de agente según el tipo de reporte según el inicio de periodo y finalización de periodo ----- */

async getAgentReportsByTypeAndStartEndPeriod(req, res, next) {
  
  // Función de validación de fecha
  function validateAndParseDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return null; // Indica que la validación falló
    }
    return new Date(dateString);
  }
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
 // Validar formato de fechas y convertir a objetos Date
    const startPeriodDate = validateAndParseDate(data.start_period);
    const endPeriodDate = validateAndParseDate(data.end_period);

    if (!startPeriodDate || !endPeriodDate) {
      return res.status(404).json({
        message: 'La fecha ingresada no contiene un formato válido, ejemplo: 2024-02-01',
        success: false
      });
    }
const totalPeriod = await ReporstsHasReport.findReportAgentByIdAndTotalPeriod(data.id_agent, data.start_period, data.end_period);
const startPeriod = await ReporstsHasReport.findReportAgentByIdAndStartPeriod(data.id_agent, data.start_period);
const endPeriod = await ReporstsHasReport.findReportAgentByIdAndEndPeriod(data.id_agent, data.end_period);
const startPeriodDaily = data.start_period;
const endPeriodDaily = data.end_period;

if (!typeReportExists) {
  console.log('El tipo o categoría de reporte no existe');
  return res.status(404).json({
    message: 'El tipo de reporte no existe',
    success: false
  });
}
if (startPeriodDaily === endPeriodDaily) {
  console.log('El agente contiene reportes diarios');

  // Ajustar los valores de las fechas para abarcar todo el día
  const startDateTime = `${data.start_period} 00:00:00`;
  const endDateTime = `${data.end_period} 23:59:59`;

  // Reutilizar la consulta general con las fechas ajustadas
  const reportDailyAgent = await ReporstsHasReport.getAgentReportsByTypeAndPeriod(
    data.id_agent,
    data.id_reports,
    startDateTime,
    endDateTime
  );

  if (!reportDailyAgent || reportDailyAgent.length === 0) {
    console.log('No se encontraron reportes para la fecha diaria:', startPeriodDaily);
    return res.status(404).json({
      message: 'No se encontraron reportes diarios para la fecha',
      success: false,
    });
  }
  
  return res.status(200).json({
    message: 'Reportes Diario encontrados',
    success: true,
    reports: reportDailyAgent,
  });
}
//Validar periodo inicial no sea mayor a periodo finalizacion

/* if (startPeriod < endPeriod) {
  console.log('Error: al introducir el periodo de inicio y de finalizción, el periodo de inicio no puede ser una fecha mayor  al perdio de finalización');
  return res.status(404).json({
    message: 'Error: al introducir el periodo de inicio y de finalizción, el periodo de inicio no puede ser una fecha mayor  al periodo de finalización',
    success: false
  });

}*/


if (totalPeriod.length === 0) {
  console.log('El Periodo total no contiene reportes');
  return res.status(404).json({
    message: 'El Periodo total no contiene reportes',
    success: false
  });
}

if (startPeriod.length === 0) {
  console.log('El Periodo de Inicio no contiene reportes');
  return res.status(404).json({
    message: 'El Periodo de Inicio no contiene reportes',
    success: false
  });
}

if (endPeriod.length === 0) {
  console.log('El Periodo de Finalización no contiene reportes');
  return res.status(404).json({
    message: 'El Periodo de Finalización no contiene reportes',
    success: false
  });
}



// Obtener los reportes del agente para el mes especificado
const agentReportsExists = await ReporstsHasReport.getAgentReportsByTypeAndPeriod(data.id_agent, data.id_reports, `${data.start_period} 00:00:00`, `${data.end_period} 23:59:59`);

if (!agentReportsExists) {
  console.log('No se pudo obtener la lista de Reportes según el tipo de reporte, según el agente, según el periodo');
  return res.status(404).json({
    message: 'No se pudo obtener la lista de Reportes según el tipo de reporte, según el agente, según el periodo',
    success: false
  });
}

if(agentReportsExists.length === 0) {
  return res.status(404).json({
  message: 'El agente no contiene reportes en el periodo especificado',
  success: true,
  reports: agentReportsExists,
  data: data,

});
}

// Devolver una respuesta exitosa con la lista de reportes si existen

return res.status(200).json({
  message: 'Se econtró reportes en el periodo especificado',
  success: true,
  reports: agentReportsExists,
  data: data,

});
     
  } catch (error) {
    console.log(`---Se produjo al generar un la lista de reportes de agente en controlador: ${error}--- `);
    return res.status(500).json({
      message: 'Se produjo al generar un la lista de reportes de agente en controlador',
      success: false,
      error: error.message
    });
  }
},   
  

  
  
} 
