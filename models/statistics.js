require('../config/config');
const Statistics = {};


//Método para insertar datos estadisticos de reportes
Statistics.create = (statistics) => {
  const sql = `
  INSERT INTO
    statistics(
	  	id_report,
	  	id_reports_has_report,
	  	id_agent,
	  	ordenes_total,
	  	ordenes_atendidas,
	  	ordenes_canceladas,
	  	ordenes_espera,
	  	ordenes_curso,
	  	ordenes_concretados,
	  	tiempo_promedio_concretado,
	  	tiempo_promedio_respuesta,
	  	ratio_exito_negociacion,
	  	periodo_statistics,
	  	ratio_cancelacion_respecto_atendidas
    )
    VALUES($1 ,$2 ,$3 ,$4 ,$5 ,$6) RETURNING id
  `;
  return db.oneOrNone(sql, [
        statistics.id_report,
	  	statistics.id_reports_has_report,
	  	statistics.id_agent,
	  	statistics.ordenes_total,
	  	statistics.ordenes_atendidas,
	  	statistics.ordenes_canceladas,
	  	statistics.ordenes_espera,
	  	statistics.ordenes_curso,
	  	statistics.ordenes_concretados,
	  	statistics.tiempo_promedio_concretado,
	  	statistics.tiempo_promedio_respuesta,
	  	statistics.ratio_exito_negociacion,
	  	statistics.periodo_statistics,
	  	statistics.ratio_cancelacion_respecto_atendidas

  ]);
}


module.exports = Statistics;