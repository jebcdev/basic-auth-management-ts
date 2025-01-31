import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    UpdateDateColumn,
} from "typeorm";

@Entity("roles")
export class RoleEntity extends BaseEntity {
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

    @UpdateDateColumn({
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
