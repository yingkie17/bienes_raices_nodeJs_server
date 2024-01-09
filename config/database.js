const { Pool } = require('pg')

 const pool = new Pool({
   connectionString: 'postgres://yingkie17:CnkZkgqbeSAMiB5BfR8RaqiHFKnBVJ1a@dpg-cmdee76d3nmc73djegrg-a.oregon-postgres.render.com/bienesraices_db_wm7t',
 }) 
 pool.connect((err) => {
   if(err) trow err
   console.log('Conexion a Postgres Exitoso!')
 })
 
 module.exports = pool