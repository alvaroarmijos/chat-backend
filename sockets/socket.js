const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket')

//Mensajes de sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //verificar autenticacion
    if (!valido){
      return client.disconnect();
    }

    //Cliente autenticado
    usuarioConectado(uid);

    //Ingresar al usuario a una sala especifica
    client.join(uid);

    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload)=>{
      
      await grabarMensaje(payload);
      io.to(payload.para).emit('mensaje-personal', payload);
    });



    client.on('disconnect', () => { 
        usuarioDesconectado(uid);
     });


    // client.on('mensaje', (payload)=>{
    //     console.log('Mensaje', payload);

    //     io.emit('mensaje', {admin: 'Nuevo mensaje'});
    // });
  });