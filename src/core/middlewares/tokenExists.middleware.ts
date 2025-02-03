import { NextFunction, Request, Response } from "express";

export class TokenExistsMiddleware {
    
    public static async check(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (!req?.headers?.authorization)
                return res
                    .status(401)
                    .json({ message: "Unauthorized" });

            const token: string =
                req?.headers?.authorization?.split(" ")[1];

            if (!token || token === "null" || token === "undefined")
                return res.status(401).json({
                    message: "Unauthorized",
                    data: null,
                });

            next();
        } catch (error) {
            next(error);
        }
    }
}
