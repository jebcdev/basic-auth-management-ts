// Importa los decoradores y clases necesarias de TypeORM para definir la entidad.
import {
    Entity, // Marca la clase como una entidad de la base de datos.
    Column, // Define una columna dentro de la tabla.
    PrimaryGeneratedColumn, // Define una columna con un identificador autoincremental.
    CreateDateColumn, // Crea una columna que almacena la fecha de creación automáticamente.
    DeleteDateColumn, // Crea una columna para el "soft delete" (eliminación lógica).
    BaseEntity, // Permite utilizar métodos ORM como find(), save(), remove(), etc.
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";

// Define la clase como una entidad que representará la tabla "roles".
@Entity("roles")
export class RoleEntity extends BaseEntity {
    // Hereda de BaseEntity para usar métodos ORM.

    // Define una columna de clave primaria autoincremental.
    @PrimaryGeneratedColumn()
    id: number;

    // Define una columna para el nombre del rol con restricciones.
    @Column({
        length: 100, // Limita la longitud máxima a 100 caracteres.
        nullable: false, // No permite valores nulos.
        unique: true, // Asegura que el valor sea único en la tabla.
    })
    name: string;

    // Define una columna para la descripción del rol.
    @Column({
        length: 255, // Longitud máxima de 255 caracteres.
        nullable: false, // No permite valores nulos.
    })
    description: string;

    /* Definir Relaciones */
    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[];


    // Columna que almacena automáticamente la fecha y hora de creación del registro.
    @CreateDateColumn({
        type: "timestamp", // Guarda la fecha como timestamp en la base de datos.
        nullable: false, // No permite valores nulos.
    })
    created_at: Date;

    // Columna que almacena automáticamente la fecha y hora de la última actualización del registro.
    @UpdateDateColumn({
        type: "timestamp",
        nullable: false,
    })
    updated_at: Date;

    // Columna para eliminación lógica, almacena la fecha de eliminación si el registro es "borrado".
    @DeleteDateColumn({
        type: "timestamp",
        nullable: true, // Permite valores nulos porque el registro puede no estar eliminado.
    })
    deleted_at: Date;
}
