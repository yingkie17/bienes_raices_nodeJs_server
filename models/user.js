//Todas las Consultas en SQL

const { use } = require('passport');
const db = require('../config/config');
const crypto = require('crypto');
const User = {};



//Metodo para Obtener todos los usuarios
User.getAll = () => {
  const sql = `SELECT * FROM users
   `;
   
   return db.manyOrNone(sql);
}



// Método para busqueda de Usuario existente en la base de datos

User.findById = (id, callback) => {
  const sql = 
  `
    SELECT 
	id,
	name,
	lastname,
	email,
	phone,
	password,
	image,
	session_token
	
FROM users WHERE id = $1`;

return db.oneOrNone(sql, id).then(user => {callback(null, user); })

}


//Método para encontrar con Email o si existe un correo de usuario almacenado en la base de datos

User.findByEmail = (email) =>{
  const sql = 
  `
  SELECT 
	U.id,
	U.name,
	U.lastname,
	U.email,
	U.phone,
	U.password,
	U.image,
	U.session_token,
	json_agg(
		json_build_object(
			'id', R.id,
			'name', R.name,
			'image', R.image,
			'route', R.route
		)
	) AS roles
	
    FROM 
	   users AS U
    INNER JOIN 
	   user_has_roles AS UHR
    ON
	   UHR.id_user = U.id
    INNER JOIN
	   roles AS R
    ON
	   R.id = UHR.id_rol
    WHERE U.email = $1
    
    GROUP BY 
    U.id
  `
  return db.oneOrNone(sql, email);
}

//Método para listar los agentes inmobiliarios en ordes de los tickets de inmobiliaria

User.findAgent = () =>{
  const sql = 
  `
  SELECT 
	U.id,
	U.name,
	U.lastname,
	U.email,
	U.phone,
	U.password,
	U.image,
	U.session_token
  FROM 
    users AS U
  INNER JOIN 
    user_has_roles AS UHR
  ON 
    UHR.id_user = U.id
  INNER JOIN 
    roles AS R  
  ON 
    R.id = UHR.id_rol
  WHERE
    R.id = 3
  `;
  return db.manyOrNone(sql);
}




//Método para encontrar por id para editar datos de usuario en el Drawer

User.findByUserId = (id) =>{
  const sql = 
  `
  SELECT 
	U.id,
	U.name,
	U.lastname,
	U.email,
	U.phone,
	U.password,
	U.image,
	U.session_token,
	json_agg(
		json_build_object(
			'id', R.id,
			'name', R.name,
			'image', R.image,
			'route', R.route
		)
	) AS roles
	
    FROM 
	   users AS U
    INNER JOIN 
	   user_has_roles AS UHR
    ON
	   UHR.id_user = U.id
    INNER JOIN
	   roles AS R
    ON
	   R.id = UHR.id_rol
    WHERE U.id = $1
    
    GROUP BY 
    U.id
  `
  return db.oneOrNone(sql, id);
}


//Método Crear Nuevo Usuario
User.create = (user) => {
  
 //Encriptar Constraseña y guardalo en una variable
  const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
  user.password = myPasswordHashed;
  //crear nuevo usuario 
  const sql = `INSERT INTO 
  users(
    name,
	lastname,
	identity_card,
	email,
	phone,
	address_agent,
    date_of_birth,
    place_of_birth,
    password,
	image,
	experience,
	certificates,
	area_specialist,
	date_of_entry,
	is_available,
	created_at,
	updated_at
  )
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING id
  `;
  return db.oneOrNone(sql, 
    [
    user.name,
    user.lastname,
    user.identity_card,
    user.email,
    user.phone,
    user.address_agent,
    user.date_of_birth,
    user.place_of_birth,
    user.password,
    user.image,
    user.experience,
    user.certificates,
	user.area_specialist,
	user.date_of_entry,
	user.is_available,
    new Date(),
    new Date()
  ]
  );
}

//Método para editar perfil

User.update = (user) => {
  const sql = 
  `UPDATE
    users
  SET 
    name = $2,
    lastname = $3,
    phone = $4,
    image = $5,
    updated_at = $6
  WHERE
    id = $1
  `;
  return db.none(sql, [
    user.id,
    user.name,
    user.lastname,
    user.phone,
    user.image,
    new Date()
  ]);
}


//Método para guardar el Token de Usuario

User.updateToken = (id, token) => {
  const sql = 
  `UPDATE
    users
  SET 
    session_token = $2

  WHERE
    id = $1
  `;
  return db.none(sql, [
    id,
    token
  ]);
}

//Método para Desencriptar el Password de usuario

User.isPasswordMatched = (userPassword, hash) => {
  const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
  
  if(myPasswordHashed === hash ){
    return true;
  }
  return false;
  
}

//Enontrar por el Id del usuario para validar la creacion del reporte
User.findUserReportById = (id) => {
  const sql = `
    SELECT * FROM users WHERE id = $1
  `;
  return db.oneOrNone(sql, [id]);
};

//Enontrar por el Id del agente para validar la creacion del reporte
User.findAgentReportById = (id) => {
  const sql = `
    SELECT * FROM users WHERE id = $1
  `;
  return db.oneOrNone(sql, [id]);
};

//Enontrar por el Email del agente para validar la creacion del reporte
User.findByEmailAgent = (email) => {
  const sql = 'SELECT * FROM users WHERE email = $1';
  return db.oneOrNone(sql, [email]);
};

User.findByPhone = (phone) => {
  const sql = 'SELECT * FROM users WHERE phone = $1';
  return db.oneOrNone(sql, [phone]);
};

//Enontrar por el id Carnet de Identidad del agente para validar la creacion del reporte
User.findByIdentityCard = (identity_card) => {
  const sql = 'SELECT * FROM users WHERE identity_card = $1';
  return db.oneOrNone(sql, [identity_card]);
};

module.exports = User;
