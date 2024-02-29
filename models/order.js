const db = require('../config/config');

const Order = {};


/*
Order.findByStatus = (status) => {
  const sql = `
  SELECT
    O.id,
    O.id_client,
    O.id_address,
    O.id_agent,
    O.status,
    O.timestamp,
      JSON_BUILD_OBJECT(
        'id', U.id,
        'name', U.name,
        'lastname', U.lastname,
        'image', U.image
      ) AS client,
      JSON_BUILD_OBJECT(
        'id', A.id,
        'address', A.address,
        'neighborhood', A.neighborhood,
        'lat', A.lat,
        'lng', A.lng,
        'hour_event', A.hour_event,
        'date_event', A.date_event
      ) AS address
  FROM 
    orders AS O
  INNER JOIN 
    users AS U
  ON 
    O.id_client = U.id
  INNER JOIN
    address AS A
  ON 
    A.id = O.id_address
  WHERE 
    status = $1;`;
  
  return db.manyOrNone(sql, status);
}
*/

/*
//Método para obtener el deatalle de las órdenes

Order.findByStatus = (status) => {
  const sql = `
  SELECT
    O.id,
    O.id_client,
    O.id_address,
    O.id_agent,
    O.status,
    O.timestamp,
    JSON_AGG(
        JSON_BUILD_OBJECT(
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
            'image6', P.image6,
            'category', C.name
        )
    ) AS products,
    JSON_BUILD_OBJECT(
        'id', U.id,
        'name', U.name,
        'lastname', U.lastname,
        'phone', U.phone,
        'email', U.email,
        'image', U.image
    ) AS client,
    JSON_BUILD_OBJECT(
        'id', A.id,
        'address', A.address,
        'neighborhood', A.neighborhood,
        'lat', A.lat,
        'lng', A.lng,
        'hour_event', A.hour_event,
        'date_event', A.date_event
    ) AS address
FROM 
    orders AS O
INNER JOIN 
    users AS U
ON 
    O.id_client = U.id
INNER JOIN
    address AS A
ON 
    A.id = O.id_address
INNER JOIN  
    order_has_products AS OHP
ON 
    OHP.id_order = O.id
INNER JOIN
    products AS P
ON
    P.id = OHP.id_product 
INNER JOIN
    categories AS C 
ON
    C.id = P.id_category 
WHERE 
    status = $1
GROUP BY 
    O.id, U.id, A.id, C.id ;`;
  
  return db.manyOrNone(sql, status);
}
*/
//Método para crear nueva Dirección
Order.create = (order) => {
  const sql = `
  INSERT INTO
    orders(
      id_client,
      id_address,
      status,
      timestamp,
      created_at,
      updated_at
    )
    VALUES($1 ,$2 ,$3 ,$4 ,$5 ,$6) RETURNING id
  `;
  return db.oneOrNone(sql, [
    order.id_client,
    order.id_address,
    order.status,
    Date.now(),
    new Date(),
    new Date()
  ]);
}

//Metodo para actualizar estado del ticket de la orden
Order.update = (order) => {
  const sql = `
  UPDATE 
    orders
  SET
    id_client = $2,
    id_address = $3,
    id_agent = $4,
    status = $5,
    updated_at = $6
  WHERE
    id = $1  
  `;
  return db.none(sql, [
    order.id,
    order.id_client,
    order.id_address,
    order.id_agent,
    order.status,
    new Date()
  ] );
}


//Metodo para actualizar el mapa
Order.updateLatLng = (order) => {
  const sql = `
  UPDATE 
    orders
  SET
    lat = $2,
    lng = $3

  WHERE
    id = $1  
  `;
  return db.none(sql, [
    order.id,
    order.lat,
    order.lng

  ] );
}


//Método para obtener informacion del agente en las órdenes

Order.findByStatus = (status) => {
  const sql = `
  SELECT
    O.id,
    O.id_client,
    O.id_address,
    O.id_agent,
    O.status,
    O.timestamp,
    JSON_AGG(
        JSON_BUILD_OBJECT(
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
            'image6', P.image6,
            'category', C.name
        )
    ) AS products,
    JSON_BUILD_OBJECT(
        'id', U.id,
        'name', U.name,
        'lastname', U.lastname,
        'phone', U.phone,
        'email', U.email,
        'image', U.image
    ) AS client,
    JSON_BUILD_OBJECT(
        'id', U2.id,
        'name', U2.name,
        'lastname', U2.lastname,
        'phone', U2.phone,
        'email', U2.email,
        'image', U2.image
    ) AS agent,
    JSON_BUILD_OBJECT(
        'id', A.id,
        'address', A.address,
        'neighborhood', A.neighborhood,
        'lat', A.lat,
        'lng', A.lng,
        'hour_event', A.hour_event,
        'date_event', A.date_event
    ) AS address
FROM 
    orders AS O
INNER JOIN 
    users AS U
ON 
    O.id_client = U.id
LEFT JOIN    
  users AS U2
ON
  O.id_agent = U2.id  
INNER JOIN
    address AS A
ON 
    A.id = O.id_address
INNER JOIN  
    order_has_products AS OHP
ON 
    OHP.id_order = O.id
INNER JOIN
    products AS P
ON
    P.id = OHP.id_product 
INNER JOIN
    categories AS C 
ON
    C.id = P.id_category 
WHERE 
    status = $1
GROUP BY 
    O.id, U.id, A.id, C.id, U2.id;`;
  
  return db.manyOrNone(sql, status);
}


//Método lista Ordenes que pertenecen al Agente
Order.findByAgentAndStatus = (id_agent, status) => {
  const sql = `
  SELECT
    O.id,
    O.id_client,
    O.id_address,
    O.id_agent,
    O.status,
    O.timestamp,
    JSON_AGG(
        JSON_BUILD_OBJECT(
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
            'image6', P.image6,
            'category', C.name
        )
    ) AS products,
    JSON_BUILD_OBJECT(
        'id', U.id,
        'name', U.name,
        'lastname', U.lastname,
        'phone', U.phone,
        'email', U.email,
        'image', U.image
    ) AS client,
    JSON_BUILD_OBJECT(
        'id', U2.id,
        'name', U2.name,
        'lastname', U2.lastname,
        'phone', U2.phone,
        'email', U2.email,
        'image', U2.image
    ) AS agent,
    JSON_BUILD_OBJECT(
        'id', A.id,
        'address', A.address,
        'neighborhood', A.neighborhood,
        'lat', A.lat,
        'lng', A.lng,
        'hour_event', A.hour_event,
        'date_event', A.date_event
    ) AS address
FROM 
    orders AS O
INNER JOIN 
    users AS U
ON 
    O.id_client = U.id
LEFT JOIN    
  users AS U2
ON
  O.id_agent = U2.id  
INNER JOIN
    address AS A
ON 
    A.id = O.id_address
INNER JOIN  
    order_has_products AS OHP
ON 
    OHP.id_order = O.id
INNER JOIN
    products AS P
ON
    P.id = OHP.id_product 
INNER JOIN
    categories AS C 
ON
    C.id = P.id_category 
WHERE 
    O.id_agent = $1 AND status = $2
GROUP BY 
    O.id, U.id, A.id, C.id, U2.id;`;
  
  return db.manyOrNone(sql, [id_agent, status]);
}



//Método lista Ordenes que pertenecen al Cliente
Order.findByClientAndStatus = (id_client, status) => {
  const sql = `
  SELECT
    O.id,
    O.id_client,
    O.id_address,
    O.id_agent,
    O.status,
    O.timestamp,
    O.lat,
    O.lng,
    JSON_AGG(
        JSON_BUILD_OBJECT(
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
            'image6', P.image6,
            'category', C.name
        )
    ) AS products,
    JSON_BUILD_OBJECT(
        'id', U.id,
        'name', U.name,
        'lastname', U.lastname,
        'phone', U.phone,
        'email', U.email,
        'image', U.image
    ) AS client,
    JSON_BUILD_OBJECT(
        'id', U2.id,
        'name', U2.name,
        'lastname', U2.lastname,
        'phone', U2.phone,
        'email', U2.email,
        'image', U2.image
    ) AS agent,
    JSON_BUILD_OBJECT(
        'id', A.id,
        'address', A.address,
        'neighborhood', A.neighborhood,
        'lat', A.lat,
        'lng', A.lng,
        'hour_event', A.hour_event,
        'date_event', A.date_event
    ) AS address
FROM 
    orders AS O
INNER JOIN 
    users AS U
ON 
    O.id_client = U.id
LEFT JOIN    
  users AS U2
ON
  O.id_agent = U2.id  
INNER JOIN
    address AS A
ON 
    A.id = O.id_address
INNER JOIN  
    order_has_products AS OHP
ON 
    OHP.id_order = O.id
INNER JOIN
    products AS P
ON
    P.id = OHP.id_product 
INNER JOIN
    categories AS C 
ON
    C.id = P.id_category 
WHERE 
    O.id_client = $1 AND status = $2
GROUP BY 
    O.id, U.id, A.id, C.id, U2.id;`;
  
  return db.manyOrNone(sql, [id_client, status]);
}





module.exports = Order;