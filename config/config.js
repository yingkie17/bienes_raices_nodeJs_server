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
  'host': 'dpg-cmdee76d3nmc73djegrg-a',
  'port': 5432,
  'database': 'bienesraices_db_wm7t',
  'user': 'yingkie17',
  'password': 'CnkZkgqbeSAMiB5BfR8RaqiHFKnBVJ1a'
};
const db = pgp(databaseConfig);
module.exports = db;
