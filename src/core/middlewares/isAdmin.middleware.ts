// Importa tipos de Express para manejar peticiones (Request), respuestas (Response) y funciones de middleware (NextFunction).
import { NextFunction, Request, Response } from "express"; 

// Importa la utilidad JwtUtil para verificar la validez de los tokens JWT.
import { JwtUtil } from "../../utils/jwt.util"; 


// Define la clase IsAdminMiddleware que contendrá el middleware para verificar si el usuario es administrador.
export class IsAdminMiddleware { 

    // Método estático que actúa como middleware para comprobar si el usuario tiene el rol de administrador.
    public static async check( 
        req: Request,         // Objeto de la solicitud HTTP entrante.
        res: Response,        // Objeto de la respuesta HTTP para enviar respuestas al cliente.
        next: NextFunction    // Función que llama al siguiente middleware en la pila.
    ): Promise<Response | void> { 
        try { 
            // Obtiene el token JWT del encabezado Authorization de la solicitud.
            // El formato esperado es "Bearer <token>", por lo que se divide por el espacio y se toma la segunda parte.
            const token: string = req?.headers?.authorization?.split(" ")[1] as string; 

            // Verifica la validez del token utilizando la utilidad JwtUtil.
            const decoded = await JwtUtil.verifyToken(token); 

            // Si el token no es válido, devuelve una respuesta 401 (No autorizado).
            if (!decoded) 
                return res 
                    .status(401) 
                    .json({ message: "Unauthorized" }); 

            // Verifica si el usuario tiene el rol de administrador (role_id === 1).
            // Si no lo tiene, responde con un error 401 (No autorizado).
            if (decoded?.data?.role_id !== 1) 
                return res 
                    .status(401) 
                    .json({ message: "Unauthorized" }); 

            // Si el token es válido y el usuario es administrador, continúa con el siguiente middleware o controlador.
            next(); 

            /*  
            Código comentado que parece ser una versión anterior del middleware:
            
            - Comprueba si existe el encabezado de autorización.
            if (!req?.headers?.authorization)
                return res
                    .status(401)
                    .json({ message: "Unauthorized" });

            - Obtiene el token de autorización de la cabecera.
            const token: string =
                req?.headers?.authorization?.split(" ")[1];

            - Verifica si el token es inválido o está vacío.
            if (!token || token === "null" || token === "undefined")
                return res.status(401).json({
                    message: "Unauthorized",
                    data: null,
                });

            - Llama a next() para continuar si el token es válido.
            next(); 
            */
        } catch (error) { 
            // Si ocurre un error durante el proceso, lo pasa al siguiente middleware de manejo de errores.
            next(error); 
        } 
    } 
}
