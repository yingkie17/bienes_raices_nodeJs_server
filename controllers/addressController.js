const Address = require('../models/address');

module.exports = {
  
   //Método para obtener la lista de direcciones creadas
async findByUser(req, res, next){
  try{
    console.log(`\n ===== Método para obtener lista de direcciones creadas ===== \n`);
    const id_user = req.params.id_user;
    const data = await Address.findByUser(id_user);
     const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ===== //Método para obtener lista de direcciones creadas ===== \n`);
    return res.status(201).json(data);
  }
  catch(error){
    console.error(`Se produjo un error al obtener la lista de direcciones creadas, Error ${error}`);
    return  res.status(501).json({
      message: `Se produjo un error al obtener la lista de direcciones creadas, Error ${error}`,
        success: false,
        error: error
    });
  }
},
  
  
  //Método para crear Direcciones
  async create(req, res, next){
    try{
      const address = req.body;
      const data = await Address.create(address);
       console.log('\n========Método para crear nueva dirección =>address ========');
       console.log('\n========Se ha creado una nueva dirección exitosamente en el método address ========');
       console.log('\n========//Método para crear nueva dirección =>address ========');
       return res.status(201).json({
        success: true,
        message: `La direccion y la fue creado exitosamente`,
        data: data.id
       });
    }
    catch(error){
      console.log('\n========Método para crear nueva dirección =>address ========');
      console.log(`Ha currido un error en el en el método Address: ${error}`);
      console.log('\n========//Método para crear nueva dirección =>address ========');
      return res.status(501).json({
        success: false,
        message: `====Ha currido un error en el en el método crear direccion y fecha====`,
        error: error
        
      });
    }
  }
}