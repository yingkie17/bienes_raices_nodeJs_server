const db = require('../config/config');
const ReporstsHasReport = {};


//Método para listar todas las los reportes generados

ReporstsHasReport.getAllReportsHasReport = () =>{
  const sql = `
    SELECT
      id,
      id_user,
      id_agent,
      name_report, 
      description_report,
      status_report,
      created_at,
      updated_at

    FROM 
      reports_has_report
    ORDER BY
       created_at DESC        
  `;
  return db.manyOrNone(sql);
},


ReporstsHasReport.addReport = (reportData) => {
  const sql = `
    INSERT INTO 
    reports_has_report(
      id_reports,
      id_user,
      id_agent,
      id_product,
      name_report,
      description_report,
      status_report,
      created_at,
      updated_at
    )
    values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id
  `;
  return db.oneOrNone(sql, [
    reportData.id_reports,
    reportData.id_user,
    reportData.id_agent,
    reportData.id_product,
    reportData.name_report,
    reportData.description_report,
    reportData.status_report,
    new Date(),
    new Date()
  ]);
}


//Método para Traer una lista según su el tipo se reporte
ReporstsHasReport.findByTypeReport = (id_reports) => {
  const sql = `
  SELECT 
    RH.id,
    RH.id_reports,
    RH.id_user,
    RH.id_agent,
    RH.id_product,
    RH.name_report,
    RH.description_report,
    RH.status_report,
    RH.created_at,
    RH.updated_at
   FROM 
    reports_has_report AS RH
   INNER JOIN 
        reports AS R
    ON RH.id_reports =   R.id
   WHERE 
        R.id = $1   
  `;
  return db.manyOrNone(sql, [id_reports]);
  
}



module.exports = ReporstsHasReport;