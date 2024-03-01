

const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');


module.exports = {
  
  //Método para obtener información de productos por categorías en las tarjetas
  
  async findByCategory(req, res, next) {
    
    try{
        console.log('\n======= Método obtener información de Producto según su categoria =======\n');
      const id_category = req.params.id_category;
      const data = await Product.findByCategory(id_category);
       console.log('\n=== Lista de productos según su categoria: ===\n');
      /* const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData); */
      ('\n======= //Método obtener información de Producto según su categoria =======\n');
      return res.status(201).json({
        message: 'Los datos de la lista de productos se obtuvieron correctamente',
        success: true,
        data: data ,
      });
    }
    catch(error){
        console.error(` ===== Ha ocurrido un error obtener información de producto por categoría al cargar la sección de tarjetas de Productos o propiedades, Error: ${error} =====`);
       return res.status(501).json({
         message: `Ha ocurrido un error al obtener informacion de productos por categoría cargados en las tarjetas, Error: ${error}`,
         success: false,
         error: error 
       });
    }
    
  },
  
  
 // Buscador por nombre y categoría
  
    async findByCategoryAndProductName(req, res, next) {
    
    try{
        console.log('\n======= Método obtener información de Producto según su categoria =======\n');
      const id_category = req.params.id_category;
      const product_name = req.params.product_name;
      const data = await Product.findByCategoryAndProductName(id_category, product_name);
       console.log('\n=== Lista de productos según su categoria: ===\n');
     /*  const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData); */
      ('\n======= //Método obtener información de Producto según su categoria =======\n');
      return res.status(201).json({
        message: 'Los datos de la lista de productos se obtuvieron correctamente',
        success: true,
        data: data ,
      });
    }
    catch(error){
        console.error(` ===== Ha ocurrido un error obtener información de producto por categoría al cargar la sección de tarjetas de Productos o propiedades, Error: ${error} =====`);
       return res.status(501).json({
         message: `Ha ocurrido un error al obtener informacion de productos por categoría cargados en las tarjetas, Error: ${error}`,
         success: false,
         error: error 
       });
    }
    
  }, 
  
  //Método para crear nuevo Producto o Propiedad
  async create(req, res, next){
    console.log('\n======= Método para Crear nuevo Producto =======\n');
      let product = JSON.parse(req.body.product);
      const formattedData = JSON.stringify(product, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
    const files = req.files;
    let inserts = 0;
    
    if(files.length === 0){
      console.error('\n==== Ha ocurrido un error al registrar nueva producto, debe contener almenos una imagen, no se esta guardando ninguna imagen ====\n');
      return res.status(501).json({
        message: 'El registro de nueva propiedad no contiene ninguna imagen, debe contener almenos una imagen para realizar el registro',
        success: false,
        
      });
    }
    else{
      //Si el registro de producto tiene mas de una imagen vamos proceder con el registro en la base de datos
      try{
        
          //vamos almacenar los datos del producto en primera instancia 
          const data = await Product.create(product); // Almacenando la información del producto
          product.id = data.id;
          
          const start = async () => {
            await asyncForEach(files, async (file) => {
              //se créa el nombre de la imagen
              const pathImage = `image_${Date.now()}`;
              //se va obtener la URL de la imagen almacenada
              const url = await storage(file, pathImage);
              
                  if(url !== undefined && url !== null ){
                    if(inserts == 0){
                      // Se guardó la imangen 1
                      product.image1 = url;
                    }
                    else if(inserts == 1) {
                      //Se guardó la imagen 2
                       product.image2 = url;
                    }
                    else if(inserts == 2) {
                      //Se guardó la imagen 3
                       product.image3 = url;
                    }
                    else if(inserts == 3) {
                      //Se guardó la imagen 4
                       product.image4 = url;
                    }
                    else if(inserts == 4) {
                      //Se guardó la imagen 5
                       product.image5 = url;
                    }
                    else if(inserts == 5) {
                      //Se guardó la imagen 6
                       product.image6 = url;
                    }
                  }
                  await Product.update(product);
                  inserts = inserts +1;
                  if (inserts == files.length){
                  console.log('\n======= Se realizó el registro de nuevo producto exitosamente =======\n');
                    ('\n======= //Método para Crear nuevo Producto =======\n')  
                    
                    return res.status(201).json({
                      success: true,
                      message: 'Le producto se registró correctamente'
                    });
                  }
              
            });
          }
          start();
          
          
      }
      catch(error){
        console.error(` ===== Ha ocurrido un error al registrar un producto o propiedad, Error: ${error} =====`);
       return res.status(501).json({
         message: `Ha ocurrido un error al registrar un producto o propiedad, Error: ${error}`,
         success: false,
         error: error
       });
      }
      
    }
    
  },
  
  
/*
// Método para actualizar Producto
async updateProduct(req, res, next) {
  try {
    const id = req.params.id;
   // const product = req.body; //Hardcodeando No necesitas analizar el cuerpo de la solicitud
    let product = JSON.parse(req.body.product); 
    console.log('\n======= Método para actualizar datos de producto =======\n');
    console.log(`Los datos de producto se actualizaron en los siguientes campos: \n`);
    const formattedData = JSON.stringify(product, null, 1).replace(/,/g, ',\n');
    console.log(formattedData);
    console.log('// ===== // Método para actualizar datos de producto =====');
    const files = req.files;
     if (files.length > 0){
          const pathImage = `image_${Date.now()}`; //Nombre de la imagen que se guarda en firebase
          const url = await storage(files[6], pathImage);
          
            if(url != undefined && url != null ) {
              user.image = url;
            }
        }
    await Product.updateProduct(id, product);
    console.log('Producto actualizado correctamente en la base de datos');
    return res.status(201).json({
      success: true,
      message: 'Los datos de producto se actualizó correctamente'
    });
  } catch (error) {
    console.error(`\n ===== Ha ocurrido un error al actualizar un producto o propiedad, Error: ${error} =====`);
    return res.status(501).json({
      message: `Ha ocurrido un error al actualizar un producto o propiedad, Error: ${error}`,
      success: false,
      error: error
    });
  }
}
  */
  
  
  
//Método para crear nuevo Producto o Propiedad
 
async updateProduct(req, res, next) {
    console.log('\n======= Método para actualizar información de un producto =======\n');
    const id = req.params.id;
    let product = JSON.parse(req.body.product);
    const files = req.files;
    try {
        if (files.length === 0) {
            const data = await Product.updateProduct(id, product);
            console.log('\n======= Se realizó la actualización de la información del producto sin imágenes =======\n');
            return res.status(201).json({
                success: true,
                message: 'El producto se actualizó correctamente sin imágenes'
            });
        }

        let inserts = 0;
        const promises = files.map(async (file, index) => {
            const pathImage = `image_${Date.now()}`;
            const url = await storage(file, pathImage);
            if (url) {
                switch (index) {
                    case 0:
                        product.image1 = url;
                        break;
                    case 1:
                        product.image2 = url;
                        break;
                    case 2:
                        product.image3 = url;
                        break;
                    case 3:
                        product.image4 = url;
                        break;
                    case 4:
                        product.image5 = url;
                        break;
                    case 5:
                        product.image6 = url;
                        break;
                }
            }
            inserts++;
            if (inserts === files.length) {
                const data = await Product.updateProduct(id, product);
                console.log('\n======= Se realizó la actualización de la información del producto con imágenes =======\n');
                return res.status(201).json({
                    success: true,
                    message: 'El producto se actualizó correctamente con imágenes'
                });
            }
        });

        await Promise.all(promises);
    } catch (error) {
        console.error(` ===== Ha ocurrido un error al actualizar la información del producto: ${error} =====`);
        return res.status(501).json({
            message: `Ha ocurrido un error al actualizar la información del producto: ${error}`,
            success: false,
            error: error
        });
    }
}
  
  
  
} 