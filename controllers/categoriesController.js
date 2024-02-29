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
  async create(req, res, next) {
  try {
    const { name, description } = req.body;

    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategory = await Category.findByName(name);
    if (existingCategory) {
      console.log('La categoria para producto o propiedad que se intenta crear ya existe');
      return res.status(400).json({
        message: 'Ya existe una categoría con este nombre',
        success: false
      });
    }

    // Si no existe, crear la nueva categoría
    const newCategory = await Category.create({ name, description });

    return res.status(201).json({
      message: 'Se ha creado una nueva categoría',
      success: true,
      data: newCategory.id
    });
  } catch (error) {
    console.error(`Error al crear la categoría: ${error}`);
    return res.status(500).json({
      message: 'Se produjo un error al crear la nueva categoría en el servidor',
      success: false,
      error: error.message
    });
  }
}

  
}