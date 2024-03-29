
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
   
//Método para generar reporte cuando se registra nuevo cliente
  
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
    
    return res.status(201).json(data);
  }
  catch(error){
    console.log(`Error al traer la lista de reportes, Error: ${error}`);
    return res.status(501).json({
      message: `Error al traer lista de reportes`,
      success: false,
      error: error
    });
  }
},
  
  
  
  
  
  
}

