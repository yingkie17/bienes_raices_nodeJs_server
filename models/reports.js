
const db = require('../config/config');
const Reports = {};

//Método para listar todas las categorías disponibles ordenados por alfabeto

Reports.getAllReports = () =>{
  const sql = `
    SELECT
      id,
      name_report, 
      description_report,
       created_at,
      updated_at

    FROM 
      reports
    ORDER BY
       name_report          
  `;
  return db.manyOrNone(sql);
}


Reports.create = (reportData) => {
  const sql = `
    INSERT INTO 
    reports(
      name_report,
      description_report,
      created_at,
      updated_at
    )
    values($1,$2,$3,$4) RETURNING id
  `;
  return db.oneOrNone(sql, [
    reports.name_report,
    reports.description_report,
    new Date(),
    new Date()
  ]);
  
}


//Encontrar por el id el reports para validar la creacion del reporte
Reports.findReportById = (id) => {
  const sql = `
    SELECT * FROM reports WHERE id = $1
  `;
  return db.oneOrNone(sql, [id]);
};

//Encontrar tipo de reporte para el agente inmobiliario
Reports.findAgentReportByType = () => {
  const sql = `
    SELECT
      R.id,
      R.name_report,
      R.description_report
    FROM 
     reports AS R
    ORDER BY
      name_report
  `;
  return db.manyOrNone(sql);
}


module.exports = Reports;

