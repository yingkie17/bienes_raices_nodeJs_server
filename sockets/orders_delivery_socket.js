module.exports = (io) => {
  const orderDeliveryNamespace = io.of('/orders/delivery');
  orderDeliveryNamespace.on('connection', function(socket) {
      
      console.log('Usuario Conectado al Namespace /orders/delivery');
          
          socket.on('position', function(data) {
              console.log(`El agente emite esta Data: ${JSON.stringify(data)}`);
              orderDeliveryNamespace.emit(`position/${data.id_order}`, {lat: data.lat, lng: data.lng});
          });
          
          socket.on('disconnect', function(data) {
             console.log('Usuario Desconectado');
          });
          
  });
 
  
    
}

