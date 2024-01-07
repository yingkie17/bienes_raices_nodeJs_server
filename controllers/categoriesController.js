//Primero vamos a obtener el modelo Categories
const Category = require('../models/category');

module.exports = {
  
  
  //Método para obtener todas las categorías disponibles
async getAll(req, res, next){
  try{
    console.log(`\n ===== Método para obtener toda las categoría de servicio ===== \n`);
    const data = await Category.getAll();
     const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ===== //Método para obtener toda las categoría de servicio ===== \n`);
    return res.status(201).json(data);
  }
  catch(error){
    console.error(`Se produjo un error al obtener la lista de categorias de servicios, Error ${error}`);
    return  res.status(501).json({
      message: `Se produjo un error al obtener la lista de categorias de servicios, Error ${error}`,
        success: false,
        error: error
    });
  }
},
    
  
//Método para crear nueva categoría
  async create(req, res, next){
    try{
      //vamos a capturar la data que envia el formulario de flutter
      const category = req.body;
      const data = await Category.create(category);
      console.log(`\n ===== Método para crear una nueva categoría de servicio ===== \n`);
      const formattedData = JSON.stringify(category, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ===== //Método para crear una nueva categoría de servicio ===== \n`);
      return res.status(201).json({
        message: 'Se ha creado una nueva categoria',
        success: true,
        data: data.id
      });
    }
    catch(error){
      console.error(`Se Produjo un Error en categoryController el error es: ${error}`);
      return res.status(501).json({
        message: 'Se produjo un error al crear la nueva categoría en categoryController en el servidor',
        success: false,
        error: error
      })
    }
  }
  
}