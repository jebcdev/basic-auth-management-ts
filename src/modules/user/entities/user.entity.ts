// Importa los decoradores y clases necesarias de TypeORM para definir la entidad.
import {
    Entity,               // Marca la clase como una entidad de la base de datos.
    Column,               // Define una columna dentro de la tabla.
    PrimaryGeneratedColumn, // Define una columna con un identificador autoincremental.
    CreateDateColumn,     // Crea una columna que almacena la fecha de creación automáticamente.
    DeleteDateColumn,     // Crea una columna para el "soft delete" (eliminación lógica).
    BaseEntity,           // Permite utilizar métodos ORM como find(), save(), remove(), etc.
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { RoleEntity } from "../../role/entities/role.entity"; 

// Define la clase como una entidad que representará la tabla "users".
@Entity("users")
export class UserEntity extends BaseEntity { // Hereda de BaseEntity para usar métodos ORM.

    // Identificador único del usuario (clave primaria autoincremental).
    @PrimaryGeneratedColumn()
    id: number;

    // Columna para almacenar el identificador del rol del usuario.
    @Column({
        nullable: false,   // No permite valores nulos.
    })
    role_id: number;

    // Columna para almacenar el nombre del usuario.
    @Column({
        length: 200,       // Limita la longitud máxima a 200 caracteres.
        nullable: false,   // No permite valores nulos.
    })
    name: string;

    // Columna para almacenar el apellido del usuario.
    @Column({
        length: 200,       // Limita la longitud máxima a 200 caracteres.
        nullable: false,   // No permite valores nulos.
    })
    surname: string;

    // Columna para almacenar el correo electrónico del usuario, debe ser único.
    @Column({
        length: 100,       // Limita la longitud máxima a 100 caracteres.
        nullable: false,   // No permite valores nulos.
        unique: true,      // Asegura que el correo electrónico sea único en la tabla.
    })
    email: string;

    // Columna para almacenar la contraseña del usuario, debe ser única para pruebas (en producción no debería).
    @Column({
        length: 100,       // Limita la longitud máxima a 100 caracteres.
        nullable: false,   // No permite valores nulos.
    })
    password: string;

    /* Definir Relaciones */
    @ManyToOne(()=>RoleEntity,(role)=>role.users/* , { eager: true } */) //habilitar el eager para que traiga el rol
    @JoinColumn({ name: "role_id" }) // Esto crea la columna roleId en la tabla de usuarios
    role: RoleEntity;

    // Columna que almacena automáticamente la fecha y hora de creación del registro.
    @CreateDateColumn({
        type: "timestamp", // Guarda la fecha como timestamp en la base de datos.
        nullable: false,   // No permite valores nulos.
    })
    created_at: Date;

    // Columna que almacena automáticamente la fecha y hora de la última actualización del registro.
    @UpdateDateColumn({
        type: "timestamp", // Guarda la fecha como timestamp.
        nullable: false,   // No permite valores nulos.
    })
    updated_at: Date;

    // Columna para la eliminación lógica (soft delete), almacena la fecha de eliminación si el registro es borrado.
    @DeleteDateColumn({
        type: "timestamp", // Guarda la fecha de eliminación lógica.
        nullable: true,    // Permite valores nulos porque el registro puede no haber sido eliminado.
    })
    deleted_at: Date;
}
