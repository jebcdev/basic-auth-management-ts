import bcrypt from "bcryptjs";

export class BcryptUtil {
  // Propiedad privada para el valor del salt de bcrypt
  private static readonly bcryptSalt: number= parseInt(process.env.BCRYPT_SALT as string, 10) || 10;

  // Método para hashear la contraseña
  static async hashPassword(password: string): Promise<string> {
    try {
      const salt: string = await bcrypt.genSaltSync(this.bcryptSalt);

      const hashedPassword: string = await bcrypt.hashSync(password, salt);

      if (!hashedPassword) {
        throw new Error("Error hashing password");
      }

      return hashedPassword;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error hashing password");
    }
  }

  // Método para comparar una contraseña sin cifrar con la hasheada
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const isMatch: boolean = await bcrypt.compareSync(password, hashedPassword);
      return isMatch;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error comparing password");
    }
  }
}
