/*  const promise = require('bluebird');
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
  'host': 'dpg-cmdee76d3nmc73djegrg-a',
  'port': 5432,
  'database': 'bienesraices_db_wm7t',
  'user': 'yingkie17',
  'password': 'CnkZkgqbeSAMiB5BfR8RaqiHFKnBVJ1a'
};
const db = pgp(databaseConfig);
module.exports = db;
<<<<<<< HEAD


*/

const promise = require('bluebird');
const options = {
  promiseLib: promise,
  query: (e) => {}
}

const pgp = require('pg-promise')(options);

const db = pgp({
  connectionString: 'postgres://yingkie17:CnkZkgqbeSAMiB5BfR8RaqiHFKnBVJ1a@dpg-cmdee76d3nmc73djegrg-a.oregon-postgres.render.com/bienesraices_db_wm7t' + "?sslmode=require",
});

module.exports = db;
=======
>>>>>>> 8201444cfaf1b0e2f6c985f40e3a293023b808f9
