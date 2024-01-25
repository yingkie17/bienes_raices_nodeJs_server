DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP (0) NOT NULL
);

INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES (
	'CLIENTE',
	'cliente/propiedades/list',
	'2023-05-15',
	'2023-05-15'
);
INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES (
	'INMOBILIARIA',
	'inmobiliaria/gestiones/list',
	'2023-05-15',
	'2023-05-15'
);
INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES (
	'AGENTE',
	'agente/gestiones/list',
	'2023-05-15',
	'2023-05-15'
)


/**Si existe un usuario va eliminar la tabla**/
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	identity_card VARCHAR(120) NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	phone VARCHAR(120) NOT NULL UNIQUE,
	address_agent VARCHAR(255) NULL,
	date_of_birth TIMESTAMP(0) NULL,
	place_of_birth VARCHAR(120) NULL,
	password VARCHAR(255) NOT NULL,
	image VARCHAR(255) NULL,
	experience VARCHAR(255) NULL,
	certificates VARCHAR(255) NULL,
	area_specialist VARCHAR(255) NULL,
	date_of_entry TIMESTAMP(0) NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255),
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP (0) NOT NULL	
);



INSERT INTO users(
	name,
	lastname,
	identity_card,
	email,
	phone,
	address_agent,
	date_of_birth,
	place_of_birth,
	password,
	experience,
	certificates,
	area_specialist,
	date_of_entry,
	is_available,
	created_at,
	updated_at
	
)

VALUES(
	'nombre admin',
	'apellidos admin',
	'00007 - LP'
	'admin@gmail.com',
	'+591 76780010',
	'dirección admin',
	'1990-11-17 12:00:00',
	'Cochabamba Bolivia',
	'123456789',
	'eperiencia admin',
	'certicados admin',
	'Ingeniería en Sistemas Desarrollo de Software',
	'2024-01-01 12:00:00',
	'true',
	'2023-04-30',
	'2023-04-30'
)



DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP (0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);




// Consulta de busqueda de usuarios con sus respectivos roles
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
    
    
    
    // ================Base de Datos para crear nueva categpría de servicios================ 
    
    
    
    
    DROP TABLE IF EXISTS categories CASCADE;
    
    CREATE TABLE categories(
    	id BIGSERIAL PRIMARY KEY,
    	name VARCHAR(180) NOT NULL UNIQUE,
    	description VARCHAR(255) NOT NULL,
    	created_at TIMESTAMP(0) NOT NULL,
    	updated_at TIMESTAMP (0) NOT NULL	
    );
    
    
    
    //Añadir Nuevo Product
    
    
    DROP TABLE IF EXISTS products CASCADE;
    CREATE TABLE products(
    	id BIGSERIAL PRIMARY KEY,
    	name_product VARCHAR(255) NOT NULL,
    	price_product DECIMAL DEFAULT 0,
    	commission_product DECIMAL DEFAULT 0,
    	city_product VARCHAR(255) NULL,
    	address_product VARCHAR(255) NULL,
    	phone_product VARCHAR(255) NULL,
    	description_product VARCHAR(255)  NULL,
    	area_product VARCHAR(255) NULL,
    	name_owner VARCHAR(255) NULL,
    	lastname_owner VARCHAR(255) NULL,
    	phone_owner VARCHAR(255) NULL,
    	email_owner VARCHAR(255) NULL,
    	ci_owner VARCHAR(255) NULL,
    	id_contract VARCHAR(255) NULL,
    	image1 VARCHAR(255) NULL,
		image2 VARCHAR(255) NULL,
    	image3 VARCHAR(255) NULL,
    	image4 VARCHAR(255) NULL,
    	image5 VARCHAR(255) NULL,
    	image6 VARCHAR(255) NULL,
    	id_category BIGINT NULL,    
    	is_available BOOLEAN NULL,	
    	created_at TIMESTAMP(0) NULL,
    	updated_at TIMESTAMP (0) NULL,
    	FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
    
    
    
    
    //Metodo para traer la categoria y cargar la informacion a las tarjetas
    
    SELECT 
		p.id,
    	P.name_product,
    	P.price_product,
    	P.commission_product,
    	P.city_product,
    	P.address_product,
    	P.phone_product,
    	P.description_product,
    	P.area_product,
    	P.name_owner,
    	P.lastname_owner,
    	P.phone_owner,
    	P.email_owner,
    	P.ci_owner,
    	P.id_contract,
    	P.image1,
		P.image2,
    	P.image3,
    	P.image4,
    	P.image5,
    	P.image6,
    	P.id_category    	
	FROM 
		products AS P
INNER JOIN
	categories AS C
ON 
	P.id_category = C.id	
WHERE
	C.id = 1
	
	
	
	
	// Tabla para crear cita con el usuario y mapas
	
	
	 DROP TABLE IF EXISTS address CASCADE;
	  CREATE TABLE address(
	  	id BIGSERIAL PRIMARY KEY,
	  	id_user BIGINT NOT NULL,
	  	address VARCHAR(255) NOT NULL,
	  	neighborhood VARCHAR(255) NOT NULL,
	  	lat DECIMAL DEFAULT 0,
	  	lng DECIMAL DEFAULT 0,
	  	hour_event TIME,
	  	date_event DATE,
	  	created_at TIMESTAMP(0) NOT NULL,
		updated_at TIMESTAMP (0) NOT NULL,
	  	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
	  	
	  ); 
	  
	  
	  
	  // Tabla para crear ordenes
	  
	  DROP TABLE IF EXISTS orders CASCADE;
	  CREATE TABLE orders (
	  	id BIGSERIAL PRIMARY KEY,
	  	id_client BIGINT NOT NULL,
	  	id_agent BIGINT NULL,
	  	id_address BIGINT NOT NULL,
	  	lat DECIMAL DEFAULT 0,
	  	lng DECIMAL DEFAULT 0,
	  	status VARCHAR(180) NOT NULL,
	  	timestamp BIGINT NOT NULL,
	  	created_at TIMESTAMP(0) NOT NULL,
		updated_at TIMESTAMP (0) NOT NULL,
	  	FOREIGN KEY(id_client) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	  	FOREIGN KEY(id_agent) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	  	FOREIGN KEY(id_address) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
	  	);
	  	
	  	
	  	
	  	DROP TABLE IF EXISTS order_has_products CASCADE;
	  	CREATE TABLE order_has_products (
	  		id_order BIGINT NOT NULL,
	  		id_product BIGINT NOT NULL,
	  		quantity BIGINT NOT NULL,
	  		created_at TIMESTAMP(0) NOT NULL,
			updated_at TIMESTAMP (0) NOT NULL,
	  		PRIMARY KEY(id_order, id_product),
	  		FOREIGN KEY(id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	  		FOREIGN KEY(id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
	  );
	  	
	 