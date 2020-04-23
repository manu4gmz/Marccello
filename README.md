# E-commerce Marccello

### Ejecutar instalación de paquetes de Node
Ejecutar el comando npm install tanto en el directorio del back, (/back), como del Front (/front).

### Crear Base de Datos
Ejecutar desde la terminal de psql el comando createdb marccello (previa instalacion de Postgress SQL DB).

### npm start
Ejecutar el comando npm start en el directorio del back, (/back) para levantar el servidor. El mismo estará disponible en el puerto 3000 (http://localhost:3000)

IMP: Modificar el estado de la db en el archivo app (/back/app.js), a true, para levantar la estructura de las tablas. Luego setearlo a false, para evitar el reinicio constante de la base. db.sync({ force: false }). Esto deberá hacerse ante cada modificación que suceda en el modelo de dicha base.

### npm run build
Ejecutar el comando npm run build en el directorio del front, (/front) para correr webpack.

### Seedeo de la DB
Ejecutar el comando npm seed en el directorio del back, (/back) para realizar un carga automática de la base de datos con productos, usuarios y categorias.

### Datos Usuario Administrador
email: "admin@mail.com"
username: "Admin"
password: "admin123"
