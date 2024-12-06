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
      RHR.id,
      RHR.id_reports,
      RHR.id_agent,
      RHR.id_product,
      RHR.id_user,
      RHR.name_report,
      RHR.description_report,
      RHR.status_report,
      RHR.created_at,
        json_build_object(
          'id', R.id, 
          'name_report', R.name_report,
          'description_report', R.description_report
        ) AS category_report,
        json_build_object(
          'id', A.id,
          'name', A.name,
          'lastname', A.lastname,
          'identity_card', A.identity_card,
          'email', A.email,
          'phone', A.phone
        )AS agent,
        json_build_object(
          'id', C.id,
          'name', C.name,
          'lastname', C.lastname,
          'identity_card', C.identity_card,
          'email', C.email,
          'phone', C.phone 
        ) AS client,
        json_build_object(
          'id', P.id,
          'name_product', P.name_product,
          'price_product', P.price_product,
          'commission_product', P.commission_product,
          'city_product', P.city_product,
          'address_product', P.address_product,
          'phone_product', P.phone_product,
          'description_product', P.description_product,
          'area_product', P.area_product,
          'name_owner', P.name_owner,
          'lastname_owner', P.lastname_owner,
          'phone_owner', P.phone_owner,
          'email_owner', P.email_owner,
          'ci_owner', P.ci_owner,
          'id_contract', P.id_contract,
          'image1', P.image1,
          'image2', P.image2,
          'image3', P.image3,
          'image4', P.image4,
          'image5', P.image5,
          'image6', P.image6
        ) AS product
    FROM
      reports_has_report AS RHR
    INNER JOIN
      reports AS R
    ON
      RHR.id_reports = R.id
    LEFT JOIN 
        users AS A
    ON
      RHR.id_agent = A.id
    LEFT JOIN 
        users AS C   
    ON 
      RHR.id_user = C.id
    LEFT JOIN
        products AS P
    ON
      RHR.id_product = P.id    
    WHERE
      RHR.id_reports = $1
    GROUP BY 
      RHR.id, R.id, A.id, C.id, P.id;
      
  `;
  return db.manyOrNone(sql, [id_reports]);
  
}
// Validar si el agente tiene reportes en el periodo total deseado
ReporstsHasReport.findReportAgentByIdAndTotalPeriod = (id_agent, start_period, end_period) => {
  const sql = `
    SELECT 
      *
    FROM reports_has_report
    WHERE id_agent = $1
    AND created_at >= $2
    AND created_at <= $3
  `;
  return db.manyOrNone(sql, [id_agent, start_period, end_period]);
};

// Validar si el agente tiene reportes en el periodo de inicio
ReporstsHasReport.findReportAgentByIdAndStartPeriod = (id_agent, start_period) => {
  const sql = `
    SELECT 
      *
    FROM reports_has_report
    WHERE id_agent = $1
    AND created_at >= $2
  `;
  return db.manyOrNone(sql, [id_agent, start_period]);
};

// Validar si el agente tiene reportes en el periodo de finalizacion
ReporstsHasReport.findReportAgentByIdAndEndPeriod = (id_agent, end_period) => {
  const sql = `
    SELECT 
      *
    FROM reports_has_report
    WHERE id_agent = $1
    AND created_at <= $2
  `;
  return db.manyOrNone(sql, [id_agent, end_period]);
};

//Método para Obtener reportes segun el tipo y el periodo
ReporstsHasReport.getAgentReportsByType = (id_agent, id_reports, year, month) => {
  const sql = `
      SELECT
        RH.id,
        RH.id_reports,
        R.name_report,
        R.description_report,
        RH.id_agent,
        U.name,
        U.lastname,
        EXTRACT(YEAR FROM RH.created_at) AS year,
        EXTRACT(MONTH FROM RH.created_at) AS month
      FROM reports_has_report AS RH
        INNER JOIN reports AS R
        ON RH.id_reports = R.id
        INNER JOIN users AS U
        ON RH.id_agent = U.id
      WHERE RH.id_agent = $1
        AND RH.id_reports = $2
        AND EXTRACT(YEAR FROM RH.created_at) = $3
        AND EXTRACT(MONTH FROM RH.created_at) = $4
  
  `;
  return db.manyOrNone(sql, [id_agent, id_reports, year, month]);
};

//Método para obtener el año del periodo de reporte, pero solo años que existen y contien periodos

ReporstsHasReport.getReportYears = () => {
  const sql = `
    SELECT DISTINCT EXTRACT(YEAR FROM created_at) AS year
    FROM reports_has_report
    ORDER BY year DESC
  `;
  return db.manyOrNone(sql);
};


ReporstsHasReport.getAgentReportsByTypeAndPeriod = (id_agent, id_reports, start_period, end_period) => {
  const sql = `
    SELECT
      RHR.id,
      RHR.id_reports,
      RHR.id_agent,
      RHR.id_product,
      RHR.id_user,
      RHR.name_report,
      RHR.description_report,
      RHR.status_report,
      RHR.created_at,
        json_build_object(
          'id', R.id, 
          'name_report', R.name_report,
          'description_report', R.description_report
        ) AS category_report,
        json_build_object(
          'id', A.id,
          'name', A.name,
          'lastname', A.lastname,
          'identity_card', A.identity_card,
          'email', A.email,
          'phone', A.phone
        )AS agent,
        json_build_object(
          'id', C.id,
          'name', C.name,
          'lastname', C.lastname,
          'identity_card', C.identity_card,
          'email', C.email,
          'phone', C.phone 
        ) AS client,
        json_build_object(
          'id', P.id,
          'name_product', P.name_product,
          'price_product', P.price_product,
          'commission_product', P.commission_product,
          'city_product', P.city_product,
          'address_product', P.address_product,
          'phone_product', P.phone_product,
          'description_product', P.description_product,
          'area_product', P.area_product,
          'name_owner', P.name_owner,
          'lastname_owner', P.lastname_owner,
          'phone_owner', P.phone_owner,
          'email_owner', P.email_owner,
          'ci_owner', P.ci_owner,
          'id_contract', P.id_contract,
          'image1', P.image1,
          'image2', P.image2,
          'image3', P.image3,
          'image4', P.image4,
          'image5', P.image5,
          'image6', P.image6
        ) AS product
    FROM
      reports_has_report AS RHR
    INNER JOIN
      reports AS R
    ON
      RHR.id_reports = R.id
    LEFT JOIN 
        users AS A
    ON
      RHR.id_agent = A.id
    LEFT JOIN 
        users AS C   
    ON 
      RHR.id_user = C.id
    LEFT JOIN
        products AS P
    ON
      RHR.id_product = P.id    
    WHERE
      RHR.id_agent = $1
      AND RHR.id_reports = $2 
      AND RHR.created_at >= $3
      AND RHR.created_at < $4
    GROUP BY 
      RHR.id, R.id, A.id, C.id, P.id;
      
  `;
  return db.manyOrNone(sql, [id_agent, id_reports, start_period, end_period]);
};




module.exports = ReporstsHasReport;