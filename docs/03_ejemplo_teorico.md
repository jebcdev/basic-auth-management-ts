## **Ejemplo Práctico: Repository Pattern con TypeORM, class-validator y class-transformer**

Vamos a crear una aplicación simple para gestionar usuarios. La estructura del proyecto será la siguiente:

```
src/
├── entity/            # Entidades de TypeORM
│   └── User.ts
├── repository/        # Repositorios
│   ├── IUserRepository.ts
│   └── UserRepository.ts
├── service/           # Lógica de negocio
│   └── UserService.ts
├── controller/        # Controladores
│   └── UserController.ts
├── dto/               # Objetos de transferencia de datos (DTOs)
│   └── CreateUserDto.ts
└── index.ts           # Punto de entrada
```

---

### **1. Entidad (`User`)**

Definimos la entidad `User` usando TypeORM y class-validator para validar los datos.

```typescript
// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, MinLength } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    name: string;

    @Column()
    @IsEmail({}, { message: "El email no es válido" })
    email: string;
}
```

---

### **2. Interfaz del Repositorio (`IUserRepository`)**

Definimos un contrato para el repositorio de usuarios.

```typescript
// src/repository/IUserRepository.ts
import { User } from "../entity/User";

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: number): Promise<void>;
}
```

---

### **3. Repositorio (`UserRepository`)**

Implementamos la interfaz del repositorio usando TypeORM.

```typescript
// src/repository/UserRepository.ts
import { Repository, getRepository } from "typeorm";
import { User } from "../entity/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOne({ where: { id } });
    }

    async create(user: User): Promise<void> {
        await this.repository.save(user);
    }

    async update(user: User): Promise<void> {
        await this.repository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
```

---

### **4. DTO (`CreateUserDto`)**

Definimos un DTO (Data Transfer Object) para validar los datos de entrada usando class-validator.

```typescript
// src/dto/CreateUserDto.ts
import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    name: string;

    @IsEmail({}, { message: "El email no es válido" })
    email: string;
}
```

---

### **5. Servicio (`UserService`)**

Implementamos la lógica de negocio usando el repositorio.

```typescript
// src/service/UserService.ts
import { User } from "../entity/User";
import { IUserRepository } from "../repository/IUserRepository";
import { CreateUserDto } from "../dto/CreateUserDto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // Transformar DTO a entidad
        const user = plainToClass(User, createUserDto);

        // Validar datos
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new Error("Datos inválidos");
        }

        // Guardar en la base de datos
        await this.userRepository.create(user);
        return user;
    }

    async updateUser(id: number, updateUserDto: CreateUserDto): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        // Actualizar datos
        user.name = updateUserDto.name;
        user.email = updateUserDto.email;

        // Validar datos
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new Error("Datos inválidos");
        }

        await this.userRepository.update(user);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
```

---

### **6. Controlador (`UserController`)**

Manejamos las solicitudes HTTP y llamamos al servicio.

```typescript
// src/controller/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { CreateUserDto } from "../dto/CreateUserDto";

export class UserController {
    constructor(private userService: UserService) {}

    async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const user = await this.userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const createUserDto: CreateUserDto = req.body;
        try {
            const user = await this.userService.createUser(createUserDto);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const updateUserDto: CreateUserDto = req.body;
        try {
            await this.userService.updateUser(id, updateUserDto);
            res.json({ message: "Usuario actualizado" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        try {
            await this.userService.deleteUser(id);
            res.json({ message: "Usuario eliminado" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
```

---

### **7. Punto de entrada (`index.ts`)**

Configuramos TypeORM y Express para iniciar la aplicación.

```typescript
// src/index.ts
import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";
import { UserController } from "./controller/UserController";
import { UserRepository } from "./repository/UserRepository";
import { UserService } from "./service/UserService";

const app = express();
app.use(express.json());

createConnection().then(async connection => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    // Rutas
    app.get("/users", (req: Request, res: Response) => userController.getAllUsers(req, res));
    app.get("/users/:id", (req: Request, res: Response) => userController.getUserById(req, res));
    app.post("/users", (req: Request, res: Response) => userController.createUser(req, res));
    app.put("/users/:id", (req: Request, res: Response) => userController.updateUser(req, res));
    app.delete("/users/:id", (req: Request, res: Response) => userController.deleteUser(req, res));

    // Iniciar servidor
    app.listen(3000, () => {
        console.log("Servidor corriendo en http://localhost:3000");
    });
}).catch(error => console.log(error));
```

---

### **Resumen**

1. **Entidad**: Define la estructura de los datos y las validaciones.
2. **Interfaz del Repositorio**: Define el contrato para el acceso a datos.
3. **Repositorio**: Implementa la interfaz usando TypeORM.
4. **Servicio**: Contiene la lógica de negocio y usa el repositorio.
5. **Controlador**: Maneja las solicitudes HTTP y llama al servicio.
6. **DTO**: Define y valida los datos de entrada.

---

### **Conclusión**

Este ejemplo muestra cómo implementar el **Repository Pattern** en TypeScript usando **TypeORM**, **class-validator** y **class-transformer**. Es una estructura limpia, mantenible y escalable para aplicaciones backend. ¡Ahora puedes aplicarlo en tus proyectos! 🚀