import jwt, { SignOptions } from "jsonwebtoken";
// import { UserService } from "../modules/user/user.service";

export class JwtUtil {
    // Clave secreta para firmar los tokens
    private static readonly JWT_SECRET: string =
        process.env.JWT_SECRET || "aVerySecretString";

    // Tiempo de expiración del token
    private static readonly TOKEN_EXPIRATION: string = "1h";

    /**
     * Genera un token JWT para un usuario.
     * @param email - El email del usuario.
     * @returns El token generado.
     * @throws Error si el usuario no existe o si ocurre un error al generar el token.
     */
    /* public static async generateToken(email: string): Promise<string> {
        try {
            // Obtener los datos del usuario
            const userData = await UserService.getByEmail(email);

            if (!userData) {
                throw new Error("User not found");
            }

            // Generar el token
            const token = jwt.sign(
                {
                    email,
                    isAdmin: userData.isAdmin,
                },
                this.JWT_SECRET,
                {
                    expiresIn: this.TOKEN_EXPIRATION,
                } as SignOptions
            );

            if (!token) {
                throw new Error("Error generating token");
            }

            return token;
        } catch (error) {
            console.error("Error generating token:", error);
            throw new Error("Error generating token");
        }
    } */

    /**
     * Verifica un token JWT.
     * @param token - El token a verificar.
     * @returns El payload decodificado del token.
     * @throws Error si el token es inválido o si ocurre un error al verificarlo.
     */
    public static async verifyToken(token: string): Promise<jwt.JwtPayload> {
        try {
            // Verificar el token
            const decoded = jwt.verify(token, this.JWT_SECRET) as jwt.JwtPayload;

            // Validar el payload del token
            if (!decoded.email || typeof decoded.isAdmin === "undefined") {
                throw new Error("Invalid token payload");
            }

            return decoded;
        } catch (error) {
            console.error("Error verifying token:", error);
            throw new Error("Error verifying token");
        }
    }
}