const db = require('../config/config');

const Address = {};

//Método para listar las direcciones creadas

Address.findByUser = (id_user) => {
  const sql = ` 
    
    SELECT 
      id,
      id_user,
      address,
      neighborhood,
      lat,
      lng,
      hour_event,
      date_event
  FROM 
    address
  WHERE 
    id_user = $1
  `;
  return db.manyOrNone(sql, id_user);
}




//Método para crear nueva Dirección
Address.create = (address) => {
  const sql = `
  INSERT INTO
    address(
      id_user,
      address,
      neighborhood,
      lat,
      lng,
      hour_event,
      date_event,
      created_at,
      updated_at
    )
    VALUES($1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8 ,$9) RETURNING id
  `;
  return db.oneOrNone(sql, [
    address.id_user,
    address.address,
    address.neighborhood,
    address.lat,
    address.lng,
    address.hour_event,
    address.date_event,
    new Date(),
    new Date()
    
    
  ]);
}

//Enontrar por el id de la dirección para validar la creacion de la orden
Address.findAddressById = (id) => {
  const sql = `
    SELECT * FROM address WHERE id = $1
  `;
  return db.oneOrNone(sql, [id]);
};


module.exports = Address;