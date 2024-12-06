
module.exports = (io) => {
const statsMetricsNamespace = io.of('/stats/metrics');
//Mesajes del Sockets
statsMetricsNamespace.on('connection', client => {
  console.log('Cliente Conectado');
  client.on('disconnect', () => { console.log('Cliente Desconectado'); });
  
  client.on('mensaje', (payload) => {
    console.log('Mensaje', payload);
    statsMetricsNamespace.emit('mensaje', {admin: 'Nuevo Mensaje'});
  });
  
  
  client.on('emitir-mensaje', (payload) => {
    console.log('emitir-mensaje', payload);
    statsMetricsNamespace.emit('nuevo-mensaje', 'Nuevo Mensaje para flutter');
  });
  
});

}