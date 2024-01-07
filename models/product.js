const db = require('../config/config');
const Product = {};

//Encontrar por Buscardor categoría y Nombre

Product.findByCategoryAndProductName = (id_category, product_name) => {
  const sql = `
   SELECT 
		p.id,
    	P.name_product,
    	P.price_product,
    	P.commission_product,
    	P.city_product,
    	P.address_product,
    	P.phone_product,
    	P.description_product,
    	P.area_product,
    	P.name_owner,
    	P.lastname_owner,
    	P.phone_owner,
    	P.email_owner,
    	P.ci_owner,
    	P.id_contract,
    	P.image1,
		P.image2,
    	P.image3,
    	P.image4,
    	P.image5,
    	P.image6,
    	P.id_category    	
	FROM 
		products AS P
INNER JOIN
	categories AS C
ON P.id_category = C.id	
WHERE
	C.id = $1 AND P.name_product ILIKE $2
  `;
  return db.manyOrNone(sql, [id_category, `%${product_name}%`]);
}



//Encontrar Por Categoría
Product.findByCategory = (id_category) => {
  const sql = `
   SELECT 
		p.id,
    	P.name_product,
    	P.price_product,
    	P.commission_product,
    	P.city_product,
    	P.address_product,
    	P.phone_product,
    	P.description_product,
    	P.area_product,
    	P.name_owner,
    	P.lastname_owner,
    	P.phone_owner,
    	P.email_owner,
    	P.ci_owner,
    	P.id_contract,
    	P.image1,
		P.image2,
    	P.image3,
    	P.image4,
    	P.image5,
    	P.image6,
    	P.id_category    	
	FROM 
		products AS P
INNER JOIN
	categories AS C
ON P.id_category = C.id	
WHERE
	C.id = $1
  `;
  return db.manyOrNone(sql, id_category);
}






Product.create = (product) => {
  const sql = `
  INSERT INTO 
  products(
        name_product,
    	price_product,
    	commission_product,
    	city_product,
    	address_product,
    	phone_product,
    	description_product,
    	area_product,
    	name_owner,
    	lastname_owner,
    	email_owner,
    	phone_owner,
    	ci_owner,
    	id_contract,
    	image1,
		image2,
    	image3,
    	image4,
    	image5,
    	image6,
    	id_category, 	
    	created_at,
    	updated_at
  )
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING id
  `;
  return db.oneOrNone(sql, [
        product.name_product,
    	product.price_product,
    	product.commission_product,
    	product.city_product,
    	product.address_product,
    	product.phone_product,
    	product.description_product,
    	product.area_product,
    	product.name_owner,
    	product.lastname_owner,
    	product.phone_owner,
    	product.email_owner,
    	product.ci_owner,
    	product.id_contract,
    	product.image1,
		product.image2,
    	product.image3,
    	product.image4,
    	product.image5,
    	product.image6,
        product.id_category,
    	new Date(),
    	new Date()
    
  ]);
}

//Actualizamos los datos de la tablas 
Product.update = (product) => {
  const sql = `
  UPDATE 
    products
  SET
        name_product = $2,
    	price_product = $3,
    	commission_product = $4,
    	city_product = $5,
    	address_product = $6,
    	phone_product = $7,
    	description_product = $8,
    	area_product = $9,
    	name_owner = $10,
    	lastname_owner = $11,
    	phone_owner = $12,
    	email_owner = $13,
    	ci_owner = $14,
    	id_contract = $15,
    	image1 = $16,
		image2 = $17,
    	image3 = $18,
    	image4 = $19,
    	image5 = $20,
    	image6 = $21,
    	id_category = $22,
    	updated_at = $23 
    WHERE 
        id = $1
  `;
  return db.none(sql, [
        product.id,
        product.name_product,
    	product.price_product,
    	product.commission_product,
    	product.city_product,
    	product.address_product,
    	product.phone_product,
    	product.description_product,
    	product.area_product,
    	product.name_owner,
    	product.lastname_owner,
    	product.phone_owner,
    	product.email_owner,
    	product.ci_owner,
    	product.id_contract,
    	product.image1,
		product.image2,
    	product.image3,
    	product.image4,
    	product.image5,
    	product.image6,
    	product.id_category,
    	new Date() 
  ]);
  
}

module.exports = Product;