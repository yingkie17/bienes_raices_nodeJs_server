const Order = require('../models/order');
const Address = require('../models/address');
const Reports = require('../models/reports');
const OrderHasProducts = require('../models/order_has_product.js');

module.exports = {
  
  
  //Método para obtener la lista de ordenes creadas
async findByStatus(req, res, next){
  try{
    console.log(`\n ===== Método para obtener lista de ordenes creadas inmobiliaria ===== \n`);
    const status = req.params.status;
    const data = await Order.findByStatus(status);
     const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ===== //Método para obtener lista de ordenes creadas inmobiliaria ===== \n`);
    return res.status(201).json(data);
  }
  catch(error){
    console.error(`Se produjo un error al obtener la lista de ordenes creadas inmobiliaria, Error ${error}`);
    return  res.status(501).json({
      message: `Se produjo un error al obtener la lista de ordenes creadas inmobiliaria, Error ${error}`,
        success: false,
        error: error
    });
  }
},
  
  //Método para crear Ordenes
  async create(req, res, next){
    try{
      let order = req.body;
      
       // Verificar la existencia del tipo de reporte
    const addressExists = await Address.findAddressById(order.id_address);
    if (!addressExists) {
      console.log(`El id de la direccion en la creación de orden no existe, Error: ${order.id_address}`);
      return res.status(404).json({
        message: `\ No se pudo obtener la dirección seleccionada`,
        success: false

      });
    }
      
      
      order.status = 'Espera';
      const data = await Order.create(order);
       
      // Recorremos todas las propiedades agregados a la orden
       
      for (const product of order.products){
        await OrderHasProducts.create(data.id, product.id, product.quantity);
      } 
       
       
       console.log('\n========Método para crear orden ========');
       console.log('\n========Se ha creado una nueva orden exitosamente en el método order ========');
       console.log('\n========//Método para crear orden ========');
       return res.status(201).json({
        success: true,
        message: `La orden fue creado exitosamente`,
        data: data.id
       });
    }
    catch(error){
      console.log('\n========Método para crear orden ========');
      console.log(`Ha currido un error en el en el método  crear order: ${error}`);
      console.log('\n========//Método para crear orden ========');
      return res.status(501).json({
        success: false,
        message: `====Ha currido un error en el en el método para crear orden====`,
        error: error
        
      });
    }
  },
  
  //Método para actualizar Ticket de Espera a Curso
  async updateTicketToCurso(req, res, next){
    try{
      let order = req.body;
      order.status = 'Curso';
      await Order.update(order);
       
       console.log('\n========Método para actualizar el status del ticket========');
       console.log('\n========Se actualizó el status del ticket exitosamente en el método updateTicket ========');
       console.log('\n========//Método para actualizar el status del ticket ========');
       return res.status(201).json({
        success: true,
        message: `La orden está en curso`,
       });
    }
    catch(error){
      console.log('\n========Método para actualizar el status del ticket========');
      console.log(`Ha currido un error en el método para actualizar el status del ticket: ${error}`);
      console.log('\n========//Método para crear orden ========');
      return res.status(501).json({
        success: false,
        message: `====Ha currido un error en el Método para actualizar el status del ticket====`,
        error: error
        
      });
    }
  },
  
  
  //Método para actualizar Ticket a Negociación
  async updateTicketToNegociacion(req, res, next){
    try{
      let order = req.body;
      order.status = 'Negociacion';
      await Order.update(order);
       
       console.log('\n========Método para actualizar el status del ticket========');
       console.log('\n========Se actualizó el status del ticket exitosamente en el método updateTicket ========');
       console.log('\n========//Método para actualizar el status del ticket ========');
       return res.status(201).json({
        success: true,
        message: `El orden esta en negociación`,
       });
    }
    catch(error){
      console.log('\n========Método para actualizar el status del ticket========');
      console.log(`Ha currido un error en el método para actualizar el status del ticket: ${error}`);
      console.log('\n========//Método para crear orden ========');
      return res.status(501).json({
        success: false,
        message: `====Ha currido un error en el Método para actualizar el status del ticket====`,
        error: error
        
      });
    }
  },
  
  
  
  
  //Método para actualizar Ticket a Concretado
  async updateTicketToConcretado(req, res, next){
    try{
      let order = req.body;
      order.status = 'Concretado';
      await Order.update(order);
       
       console.log('\n========Método para actualizar el status del ticket========');
       console.log('\n========Se actualizó el status del ticket exitosamente en el método updateTicket ========');
       console.log('\n========//Método para actualizar el status del ticket ========');
       return res.status(201).json({
        success: true,
        message: `La orden fue concretada`,
       });
    }
    catch(error){
      console.log('\n========Método para actualizar el status del ticket========');
      console.log(`Ha currido un error en el método para actualizar el status del ticket: ${error}`);
      console.log('\n========//Método para crear orden ========');
      return res.status(501).json({
        success: false,
        message: `====Ha currido un error en el Método para actualizar el status del ticket====`,
        error: error
        
      });
    }
  },
  
  
  
  
  
  
  
   //Método para actualizar el Mapa
  async updateLatLng(req, res, next){
    try{
      let order = req.body;
      await Order.updateLatLng(order);
       
       console.log('\n========Método para actualizar el mapa========');
     
       return res.status(201).json({
        success: true,
        message: `Método para actualizar el mapa fue actualizado correctamente`,
       });
    }
    catch(error){
      console.log('\n========Método para actualizar el mapa========');
      console.log(`Ha currido un error en el Método para actualizar el mapa: ${error}`);
      console.log('\n========//Método para actualizar el mapa ========');
      return res.status(501).json({
        success: false,
        message: `====Ha currido un error en el Método para actualizar el mapa====`,
        error: error
        
      });
    }
  },
  
  
  
  //Método para actualizar Ticket a cancelado
  async updateTicketToCancelado(req, res, next){
    try{
      let order = req.body;
      order.status = 'Cancelado';
      await Order.update(order);
       
       console.log('\n========Método para actualizar el status del ticket========');
       console.log('\n========Se actualizó el status del ticket exitosamente en el método updateTicket ========');
       console.log('\n========//Método para actualizar el status del ticket ========');
       return res.status(201).json({
        success: true,
        message: `La orden fue cancelada`,
       });
    }
    catch(error){
      console.log('\n========Método para actualizar el status del ticket========');
      console.log(`Ha currido un error en el método para actualizar el status del ticket: ${error}`);
      console.log('\n========//Método para crear orden ========');
      return res.status(501).json({
        success: false,
        message: `====Ha currido un error en el Método para actualizar el status del ticket====`,
        error: error
        
      });
    }
  },
  
  
//Método para obtener la lista de ordenes que pertenecen al agente
async findByAgentAndStatus(req, res, next){
  try{
    console.log(`\n ===== Método para obtener lista de ordenes que pertenecen al agente ===== \n`);
    const id_agent = req.params.id_agent;
    const status = req.params.status;
    const data = await Order.findByAgentAndStatus(id_agent, status);
     const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ===== //Método para obtener lista de ordenes que pertenecen al agente ===== \n`);
    return res.status(201).json(data);
  }
  catch(error){
    console.error(`Se produjo un error al obtener la lista de ordenes que pertenece al agente, Error ${error}`);
    return  res.status(501).json({
      message: `Se produjo un error al obtener la lista de ordenes que pertenece al agente, Error ${error}`,
        success: false,
        error: error
    });
  }
},
  
  
  
  //Método para obtener la lista de ordenes que pertenecen al cliente
async findByClientAndStatus(req, res, next){
  try{
    console.log(`\n ===== Método para obtener lista de ordenes que pertenecen al cliente ===== \n`);
    const id_client = req.params.id_client;
    const status = req.params.status;
    const data = await Order.findByClientAndStatus(id_client, status);
     const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ===== //Método para obtener lista de ordenes que pertenecen al cliente ===== \n`);
    return res.status(201).json(data);
  }
  catch(error){
    console.error(`Se produjo un error al obtener la lista de ordenes que pertenece al cliente, Error ${error}`);
    return  res.status(501).json({
      message: `Se produjo un error al obtener la lista de ordenes que pertenece al cliente, Error ${error}`,
        success: false,
        error: error
    });
  }
},
  
  
}