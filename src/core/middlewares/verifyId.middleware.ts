import { Request, Response, NextFunction } from "express";

// Clase que define el middleware para verificar el ID
export class VerifyIdMiddleware {

  // Método estático para verificar el ID en la solicitud
  public static validate(req: Request, res: Response, next: NextFunction): Response | void {
    
    // Verificar si el parámetro `id` está presente
    if (!req.params.id) {
      return res.status(400).json({
        message: "Id Is Required",
        data: null,
      });
    }

    // Verificar si el parámetro `id` es un número válido
    if (isNaN(parseInt(req.params.id))) {
      return res.status(400).json({
        message: "Id Must Be A Number",
        data: null,
      });
    }

    // Pasar al siguiente middleware o controlador si todo está bien
    next();
  }
}
