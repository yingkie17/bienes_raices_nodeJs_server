const db = require('../config/config');
const ReporstsHasReport = {};


//Método para listar todas las los reportes generados

ReporstsHasReport.getAllReportsHasReport = () =>{
  const sql = `
    SELECT
      id,
      name_report, 
      description_report,
      status_report,
      created_at,
      updated_at

    FROM 
      reports_has_report
    ORDER BY
       name_report          
  `;
  return db.manyOrNone(sql);
},


ReporstsHasReport.addReport = (reportData) => {
  const sql = `
    INSERT INTO 
    reports_has_report(
      id_reports,
      id_user,
      id_product,
      name_report,
      description_report,
      status_report,
      created_at,
      updated_at
    )
    values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id
  `;
  return db.oneOrNone(sql, [
    reportData.id_reports,
    reportData.id_user,
    reportData.id_product,
    reportData.name_report,
    reportData.description_report,
    reportData.status_report,
    new Date(),
    new Date()
  ]);
}

module.exports = ReporstsHasReport;