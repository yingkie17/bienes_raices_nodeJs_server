// Se va exportar con una ruta ya que se esta manejado con un API

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Rol = require('../models/rol');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');


module.exports ={
  //Método para obtener Informacion de Usuarios
  async getAll(req, res, next){
    try{
      const data = await User.getAll();
      const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      return res.status(201).json(data);
    }
    catch (error){
      console.error(`Error: ${error}`);
      return res.status(501).json(
        {
          success: false,
          message: 'Error al Obtener los Usuarios UserControllers'
        }
        );
    }
  },
  
  // Método para encontrar usuario por su id y cargar datos de usuario en Drawer
  async findById(req, res, next){
    try{
      const id = req.params.id;
      const data = await User.findByUserId(id);
      console.log(`\n ======= Obteniendo toda la información completa del usuario ======= \n`);
      const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ======= // Obteniendo toda la información completa del usuario ======= \n`);
      return res.status(201).json(data);
      
    }
    catch (error){
      console.error(`Error: ${error}`);
      return res.status(501).json(
        {
          success: false,
          message: 'Error al Obtener el Usuario en el userController del Método para encontrar usuario por su id'
        }
        ); 
    }
  },
  

  //Obtener lista de agentes
  
   async findAgent(req, res, next){
    try{
      const data = await User.findAgent();
      console.log(`\n ======= Obteniendo lista de agentes ======= \n`);
      const formattedData = JSON.stringify(data, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log(`\n ======= // Obteniendo lista de agentes ======= \n`);
      return res.status(201).json(data);
      
    }
    catch (error){
      console.error(`Error: ${error}`);
      return res.status(501).json(
        {
          success: false,
          message: 'Error al Obtener lista de Angetes en el userController del Método lista agentes'
        }
        ); 
    }
  },
  
  
  //registrar nuevo usuario
  async register(req, res, next){
    try{
      const user = req.body;
      const data = await User.create(user);
      await Rol.create(data.id, 1); //Establecer rol por defecto de cliente al crear usuario
      return res.status(201).json({
        success: true,
        message: 'El registro se Realizo Correctamente, ya puede iniciar sesión',
        data: data.id
      });
       console.log(`\n ======= Se registró nuevo usuario ======= \n`);
    } 
    catch(error){
      console.error(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message:'Error al realizar el registro de nuevo usuario',
        error: error
      });
    }
  },
  
  
  //registrar nuevo usuario con imagen
  async registerWithImage(req, res, next){
    try{
      const user = JSON.parse(req.body.user);
      console.log(`Datos de registro de nuevo usuario con imagen: ${user}`);
      
      const files = req.files;
        if (files.length > 0){
          const pathImage = `image_${Date.now()}`; //Nombre de la imagen que se guarda en firebase
          const url = await storage(files[0], pathImage);
          
            if(url != undefined && url != null ) {
              user.image = url;
            }
        }
      const data = await User.create(user);
      await Rol.create(data.id, 1);
      console.log(`\n ======= El registro de nuevo usuario se realizó correctamente ======= \n`); //Establecer rol por defecto de cliente al crear usuario
      return res.status(201).json({
        success: true,
        message: 'El registro se Realizo Correctamente, ya puede iniciar sesión',
        data: data.id
      });
      
    } 
    catch(error){
      console.error(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message:'Error al realizar el registro de nuevo usuario',
        error: error
      });
    }
  },
  
  
  
  
    //registrar nuevo Agente Inmobiliario con imagen
  async registerAgentWithImage(req, res, next){
    try{
      const user = JSON.parse(req.body.user);
      console.log(`Datos de registro de agente: ${user}`);
      
      const files = req.files;
        if (files.length > 0){
          const pathImage = `image_${Date.now()}`; //Nombre de la imagen que se guarda en firebase
          const url = await storage(files[0], pathImage);
          
            if(url != undefined && url != null ) {
              user.image = url;
            }
        }
      const data = await User.create(user);
      await Rol.create(data.id, 3);
      console.log(`\n ======= El registro de nuevo agente se realizó correctamente ======= \n`); //Establecer rol por defecto de cliente al crear usuario
      return res.status(201).json({
        success: true,
        message: 'El registro de Agente fue exitoso',
        data: data.id
      });
      
    } 
    catch(error){
      console.error(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message:'Error al realizar el registro de agente',
        error: error
      });
    }
  },
  
  
  
  
  
  
  
  
  
  
 // Método para Editar Perfil
  async update(req, res, next){
    
    try{
      const user = JSON.parse(req.body.user);
      console.log('\n===== Método para actualizar datos de usuario =====\n');
      console.log(`Los datos de Usuario se actualizaron en los siguientes campos: \n`);
      const formattedData = JSON.stringify(user, null, 1).replace(/,/g, ',\n');
      console.log(formattedData);
      console.log('// ===== // Método para actualizar datos de usuario =====');
      const files = req.files;
        
        if (files.length > 0){
          const pathImage = `image_${Date.now()}`; //Nombre de la imagen que se guarda en firebase
          const url = await storage(files[0], pathImage);
          
            if(url != undefined && url != null ) {
              user.image = url;
            }
        }

      await User.update(user);
      return res.status(201).json({
        success: true,
        message: 'Los datos de usuario se actualizó correctamente'
      });
       
    } 
    catch(error){
      console.error('\n===== Ocurrió un error al actulizar los datos de usario  =====\n');
      console.error(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message:'Error al editar perfil en el userController',
        error: error
      });
    }
  },
  
// Método para Login
  
    async login(req, res, next){
      
      try{
        const email = req.body.email;
        const password = req.body.password;
        const myUser = await User.findByEmail(email);
        
        if(!myUser){
           console.error('// ===== El correo que ingreso el usuario para login no existe =====');
          return res.status(401).json({
            success: false,
            message: 'El correo electrónico no existe'
          }); 
          
        }
        if(User.isPasswordMatched(password, myUser.password)) {
          const token = jwt.sign({
            id: myUser.id, 
            email: myUser.email
          },keys.secretOrKey, {
            //expiresIn: (60*60*24) // Sesión expira en 1 hora
            //expiresIn: (60*15) // Sesión expira en 15 minutos
          });
          const data = {
            id: myUser.id,
            name: myUser.name,
            lastname: myUser.lastname,
            email: myUser.email,
            phone: myUser.phone,
            password: myUser.password,
            image: myUser.image,    
            session_token:  `JWT ${token}`,
            roles: myUser.roles           
          }
          
            await User.updateToken(myUser.id, `JWT ${token}`);
        
          console.log('\n===== Usuario logueado =====\n');
          console.log(`Datos de Usuario:\n id: ${JSON.stringify(data.id)},\n nombre: ${JSON.stringify(data.name)},\n apellidos: ${JSON.stringify(data.lastname)},\n email: ${JSON.stringify(data.email)}\n`);
          console.log('\n===== // Usuario logueado =====\n');
          return res.status(201).json({
            success: true,
            data: data,
            message: 'Usuario autenticado exitosamente',
          });
          
          
        }
        else{
          console.error('\n===== El usuario ingresó una contraseña incorrecta =====\n');
          return res.status(401).json({
            success: false,
            message: 'La Contraseña es incrrecta',
          });
        }
        
      }
      catch(error){
        console.error(`Se Produjo un error en el método Login UserController Error: ${error}`);
        return res.status(501).json({
          success: false,
          message: 'Se Produjo un error en el método Login UserController',
          error: error
        });
      }
    },
 
//Método cerrar sesión        
//Método para Restablecer Sesion ToKen en nulo nuevamente cuando el usuario cierra sesión  
  async logout(req, res ,next){
    try{

      const id = req.body.id;
      await User.updateToken(id, null);
      console.log(`\n ===== El usuario con id: ${id}, cerró sesión ===== \n`);
      return res.status(201).json({
        success: true,
        message: 'la sesión del usuario se ha cerrado cxitosamente'
      });
      
    }
    catch(error){
      
        return res.status(501).json({
          success: false,
          message: 'Se Produjo un error en el método logout',
          error: error
        });
      }
  }
  
};