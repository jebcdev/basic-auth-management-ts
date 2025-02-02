// Define una clase para almacenar la configuración de la base de datos.
export class DatabaseConfig {

    // Declaración de propiedades para los parámetros de conexión a la base de datos.
    public static readonly type:string = process.env.DB_TYPE || "mysql";  // Obtiene el tipo de base de datos desde variables de entorno o usa "mysql" por defecto.
        public static readonly host:string = process.env.DB_HOST || "localhost";  // Obtiene el host de la base de datos o usa "localhost" por defecto.
        public static readonly port:number = Number(process.env.DB_PORT || "3306") || 3306;  // Convierte el puerto a número o usa 3306 por defecto.
        public static readonly username:string = process.env.DB_USERNAME || "root";  // Obtiene el usuario o usa "root" por defecto.
        public static readonly password:string = process.env.DB_PASSWORD || "";  // Obtiene la contraseña o usa una cadena vacía por defecto.
        public static readonly database:string = process.env.DB_NAME || "basic-auth-management-ts";  // Obtiene el nombre de la base de datos o usa "basic-auth-management-ts" por defecto.
}
