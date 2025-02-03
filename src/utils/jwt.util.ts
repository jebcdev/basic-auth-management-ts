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
    public static async generateToken(data: object): Promise<string> {
        try {
            
            // Generar el token
            const token = jwt.sign(
                {
                   data
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
    }

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
            if (!decoded?.data?.role_id ||!decoded?.data?.user_id) {
                throw new Error("Invalid token payload");
            }

            return decoded;
        } catch (error) {
            console.error("Error verifying token:", error);
            throw new Error("Error verifying token");
        }
    }
}