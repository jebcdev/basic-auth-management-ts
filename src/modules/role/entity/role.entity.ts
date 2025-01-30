import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
} from "typeorm";

@Entity("roles")
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        length: 255,
        nullable: false,
    })
    description: string;

    @CreateDateColumn({
        type: "timestamp",
        nullable: false,
    })
    created_at: Date;

    @DeleteDateColumn({
        type: "timestamp",
        nullable: false,
    })
    updated_at: Date;

    @DeleteDateColumn({
        type: "timestamp",
        nullable: true,
    })
    deleted_at: Date;
}
