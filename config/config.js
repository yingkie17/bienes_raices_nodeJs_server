const promise = require('bluebird');
const options = {
  promiseLib: promise,
  query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
  return stringValue;
});
const databaseConfig = {
  connectionString: 'postgres://yingkie17:CnkZkgqbeSAMiB5BfR8RaqiHFKnBVJ1a@dpg-cmdee76d3nmc73djegrg-a.oregon-postgres.render.com/bienesraices_db_wm7t' + "?sslmode=require", 
  ssl: true,
};
const db = pgp(databaseConfig);
module.exports = db;
