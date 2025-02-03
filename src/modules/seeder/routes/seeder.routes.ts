// Importa el Router de Express para definir rutas HTTP.
import { Router } from "express"; 

// Importa el controlador SeederController que contiene la lógica para sembrar datos en la base de datos.
import { SeederController } from "../controllers/seeder.controller"; 


// Define la clase SeederRoutes que gestionará las rutas relacionadas con el seed de datos.
export class SeederRoutes { 
    
    // Define una propiedad pública y de solo lectura que almacenará la instancia del enrutador de Express.
    public readonly router: Router; 

    // Define una propiedad privada y de solo lectura para la instancia del SeederController.
    private readonly controller: SeederController; 

    // Constructor de la clase donde se inicializan el enrutador y el controlador.
    constructor() { 
        // Inicializa el enrutador de Express para definir las rutas.
        this.router = Router(); 
        
        // Crea una instancia del SeederController para manejar la lógica de negocio.
        this.controller = new SeederController(); 

        // Llama al método para inicializar las rutas asociadas a este enrutador.
        this.initializeRoutes(); 
    } 

    // Método público que define las rutas para el enrutador.
    public initializeRoutes(): void { 
        // Extrae el método seedRolesUsers del controlador para usarlo en la ruta.
        const { seedRolesUsers } = this.controller; 

        // Define una ruta POST en "/rolesusers" que ejecuta el método seedRolesUsers.
        // Se utiliza .bind(this.controller) para mantener el contexto correcto de "this" dentro del método.
        this.router.post("/rolesusers", seedRolesUsers.bind(this.controller)); 
    } 
}
