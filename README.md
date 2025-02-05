# Basic Auth Management - Express, TypeScript & Node.js

Este proyecto es una implementación básica de autenticación y gestión de usuarios utilizando **Express.js**, **TypeScript** y **Node.js**. El objetivo es aprender y aplicar conceptos clave como autenticación, roles, protección de rutas, validación de datos y estructura modular.

## Tecnologías Utilizadas

- **Express.js**: Framework para Node.js utilizado para la creación de APIs.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **JWT (JSON Web Tokens)**: Autenticación basada en tokens.
- **Bcrypt.js**: Librería para encriptar contraseñas.
- **TypeORM**: ORM para trabajar con bases de datos SQL.
- **MySQL**: Sistema de gestión de bases de datos.

## Estructura del Proyecto

```
src/
  ├── app.ts                       # Archivo principal de configuración de Express
  ├── core/                        # Lógica compartida y configuración global
  │   ├── config/                  # Archivos de configuración como base de datos
  │   ├── middlewares/             # Middlewares para validación y protección de rutas
  ├── modules/                     # Módulos del proyecto
  │   ├── _root/                   # Rutas y controladores globales
  │   ├── auth/                    # Módulo de autenticación (login, registro, etc.)
  │   ├── role/                    # Módulo para gestionar roles
  │   ├── seeder/                  # Módulo para crear datos iniciales (seeders)
  │   ├── user/                    # Módulo para gestionar usuarios
  ├── utils/                       # Utilidades como bcrypt y JWT
  ├── server.ts                    # Configuración y arranque del servidor
tsconfig.json                      # Configuración de TypeScript
.env                               # Variables de entorno (base de datos, JWT, etc.)
package.json                       # Dependencias y scripts del proyecto
```

## Instalación

Para instalar y ejecutar este proyecto, sigue los siguientes pasos:

### 1. Clona el Repositorio

```bash
git clone https://github.com/jebcdev/basic-auth-management-ts.git
```

### 2. Instala las Dependencias

Entra al directorio del proyecto y ejecuta el siguiente comando:

```bash
npm install
```

### 3. Configura el Archivo `.env`

Crea un nuevo archivo llamado `.env` y configura las variables según tu entorno. Algunas de las variables más importantes son:

```
API_PREFIX="/api/v1"  # Prefijo de la API, útil para versionar las rutas y tener un punto común.
PORT=4000  # Puerto en el que el servidor estará escuchando.

DB_HOST=localhost  # Host de la base de datos
DB_PORT=3306  # Puerto de la base de datos
DB_USERNAME=root  # Usuario de la base de datos
DB_PASSWORD=your_database_password  # Contraseña de la base de datos (debería ser configurada por el usuario)
DB_NAME=auth_management_db  # Nombre de la base de datos (más genérico)

BCRYPT_SALT=10  # Valor para el "salt" que se usará al hashear las contraseñas con bcrypt.
JWT_SECRET=your_jwt_secret_key  # Clave secreta para firmar y verificar tokens JWT. Mantenerla segura.

```

### Instrucciones para ejecutar el proyecto

1. **Compilar el Proyecto**  
   Para compilar y transpilar el código TypeScript a JavaScript en el directorio `dist`:
   ```bash
   npm run build
   ```

2. **Modo Desarrollo con Watch**  
   Si deseas ejecutar el proyecto en modo desarrollo con watch (para compilar y ejecutar automáticamente cuando hay cambios en el código):
   ```bash
   npm run dev
   ```

3. **Modo Producción**  
   Para ejecutar el proyecto en modo producción (esto asume que ya has compilado el proyecto con `npm run build`):
   ```bash
   npm start
   ```

--- 

## Rutas Disponibles

### **Autenticación (Auth)**
- **POST /auth/login**: Inicia sesión y devuelve un token JWT.
- **POST /auth/register**: Registra un nuevo usuario.
- **POST /auth/profile**: Obtiene los detalles del perfil del usuario autenticado.

### **Usuarios (User)**
- **GET /users**: Obtiene una lista de usuarios.
- **POST /users**: Crea un nuevo usuario.
- **GET /users/:id**: Obtiene los detalles de un usuario.
- **PATCH /users/:id**: Actualiza los detalles de un usuario.
- **DELETE /users/:id**: Elimina un usuario.

### **Roles (Role)**
- **GET /roles**: Obtiene una lista de roles.
- **POST /roles**: Crea un nuevo rol.
- **GET /roles/:id**: Obtiene los detalles de un rol.
- **PATCH /roles/:id**: Actualiza un rol.
- **DELETE /roles/:id**: Elimina un rol.

### **Seeders (Seeder)**
- **POST /seed/rolesusers**: Crea datos iniciales para roles y usuarios.

---

## Seguridad

- **Autenticación**: Se usa JWT para la autenticación. Al iniciar sesión, el servidor devuelve un token que debe ser incluido en las cabeceras de las peticiones.
- **Roles**: Los usuarios pueden tener diferentes roles (por ejemplo, administrador, usuario). Se implementan middlewares para proteger rutas según los roles.
- **Bcrypt.js**: Las contraseñas se almacenan de forma segura utilizando Bcrypt.js para el hash.

## Contribuciones

Si deseas contribuir a este proyecto, estas invitado y eres libre de hacerlo

---

## Licencia

Este proyecto está bajo la Licencia MIT.

---

## Lista de Reproducción

Puedes acceder a la lista de reproducción completa en [este enlace](https://www.youtube.com/playlist?list=PLek3UYLkoPpyDtmRYR9GditnbiwM_9S-1).
