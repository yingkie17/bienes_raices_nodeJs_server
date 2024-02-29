const db = require('../config/config');
const Category = {};

//Método para listar todas las categorías disponibles ordenados por alfabeto

Category.getAll = () =>{
  const sql = `
    SELECT 
      id,
      name, 
      description
    FROM 
      categories
    ORDER BY
       name          
  `;
  return db.manyOrNone(sql);
}


//Método para crear nueva categoría

Category.create = (category) => {
  const sql = `
  INSERT INTO 
    categories(
      name, 
      description,
      created_at,
      updated_at
    )
    VALUES ($1, $2, $3, $4) RETURNING id
  `;
  return db.oneOrNone(sql, [
    category.name,
    category.description,
    new Date(),
    new Date()
  ]);
  
}
;

Category.findByName = (name) => {
  const sql = 'SELECT * FROM categories WHERE name = $1';
  return db.oneOrNone(sql, [name]);
};

module.exports = Category;