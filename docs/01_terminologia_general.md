## **Repository Pattern in TypeScript | Patrón de repositorio en TypeScript**

### **¿What is the Repository Pattern? | ¿Qué es el Patrón Repositorio?**
El **Repository Pattern** es un patrón de diseño que **abstrae la lógica de acceso a datos** (como una base de datos) en una capa separada. Su objetivo es:

1. **Separar la lógica de negocio** de la lógica de acceso a datos.
2. **Centralizar** las operaciones de acceso a datos (CRUD: Crear, Leer, Actualizar, Eliminar).
3. **Facilitar las pruebas** y el mantenimiento del código.

---

### **Conceptos clave**

#### 1. **Entidad**
- **Definición**: Representa un objeto del mundo real o un concepto de negocio. En el contexto de una base de datos, una entidad suele mapearse a una tabla.
- **Ejemplo**:
  ```typescript
  class User {
      id: number;
      name: string;
      email: string;

      constructor(id: number, name: string, email: string) {
          this.id = id;
          this.name = name;
          this.email = email;
      }
  }
  ```

---

#### 2. **Interfaz del Repositorio**
- **Definición**: Es un **contrato** que define los métodos que debe implementar un repositorio. Esto permite desacoplar la lógica de negocio de la implementación concreta del repositorio.
- **Responsabilidad**: Especificar qué operaciones de acceso a datos deben estar disponibles.
- **Ejemplo**:
  ```typescript
  interface IUserRepository {
      findAll(): Promise<User[]>;
      findById(id: number): Promise<User | null>;
      create(user: User): Promise<void>;
      update(user: User): Promise<void>;
      delete(id: number): Promise<void>;
  }
  ```

---

#### 3. **Repositorio**
- **Definición**: Es una clase que **implementa la interfaz del repositorio** y contiene la lógica para interactuar con la fuente de datos (base de datos, archivos, etc.).
- **Responsabilidad**: Realizar operaciones CRUD sobre una entidad específica.
- **Ejemplo**:
  ```typescript
  class UserRepository implements IUserRepository {
      private users: User[] = []; // Simulación de base de datos en memoria

      async findAll(): Promise<User[]> {
          return this.users;
      }

      async findById(id: number): Promise<User | null> {
          return this.users.find(user => user.id === id) || null;
      }

      async create(user: User): Promise<void> {
          this.users.push(user);
      }

      async update(user: User): Promise<void> {
          const index = this.users.findIndex(u => u.id === user.id);
          if (index !== -1) {
              this.users[index] = user;
          }
      }

      async delete(id: number): Promise<void> {
          this.users = this.users.filter(user => user.id !== id);
      }
  }
  ```

---

#### 4. **Servicio**
- **Definición**: Contiene la **lógica de negocio** de la aplicación. Utiliza el repositorio para acceder a los datos y aplica reglas de negocio, validaciones, cálculos, etc.
- **Responsabilidad**: Orquestar las operaciones entre el controlador y el repositorio.
- **Ejemplo**:
  ```typescript
  class UserService {
      constructor(private userRepository: IUserRepository) {}

      async getAllUsers(): Promise<User[]> {
          return this.userRepository.findAll();
      }

      async createUser(name: string, email: string): Promise<void> {
          const id = Math.floor(Math.random() * 1000); // Simulación de ID único
          const newUser = new User(id, name, email);
          await this.userRepository.create(newUser);
      }
  }
  ```

---

#### 5. **Controlador**
- **Definición**: Maneja las **solicitudes HTTP** (en el caso de una API) y actúa como intermediario entre el cliente (frontend, móvil, etc.) y el servicio.
- **Responsabilidad**: Recibir la solicitud, validar los datos de entrada (si es necesario) y devolver una respuesta.
- **Ejemplo**:
  ```typescript
  import { Request, Response } from 'express';

  class UserController {
      constructor(private userService: UserService) {}

      async getAllUsers(req: Request, res: Response): Promise<void> {
          const users = await this.userService.getAllUsers();
          res.json(users);
      }

      async createUser(req: Request, res: Response): Promise<void> {
          const { name, email } = req.body;
          await this.userService.createUser(name, email);
          res.status(201).json({ message: 'User created' });
      }
  }
  ```

---

### **Orden de implementación**

1. **Entidad**: Define la estructura de los datos.
2. **Interfaz del Repositorio**: Define el contrato para el acceso a datos.
3. **Repositorio**: Implementa la interfaz del repositorio.
4. **Servicio**: Añade la lógica de negocio.
5. **Controlador**: Maneja las solicitudes HTTP.

---

### **¿Por qué este orden?**

1. **Dependencias claras**:
   - Cada componente depende del anterior. Por ejemplo, el servicio depende del repositorio, y el controlador depende del servicio.
2. **Facilita las pruebas**:
   - Puedes probar cada componente de manera independiente (por ejemplo, probar el repositorio sin necesidad de un controlador).
3. **Mantenibilidad**:
   - Si necesitas cambiar la lógica de negocio, solo modificas el servicio sin afectar el repositorio o el controlador.

---

### **Ejemplo completo**

#### 1. Entidad (`User`)
```typescript
class User {
    id: number;
    name: string;
    email: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
```

#### 2. Interfaz del Repositorio (`IUserRepository`)
```typescript
interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: number): Promise<void>;
}
```

#### 3. Repositorio (`UserRepository`)
```typescript
class UserRepository implements IUserRepository {
    private users: User[] = [];

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: number): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }

    async create(user: User): Promise<void> {
        this.users.push(user);
    }

    async update(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
        }
    }

    async delete(id: number): Promise<void> {
        this.users = this.users.filter(user => user.id !== id);
    }
}
```

#### 4. Servicio (`UserService`)
```typescript
class UserService {
    constructor(private userRepository: IUserRepository) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async createUser(name: string, email: string): Promise<void> {
        const id = Math.floor(Math.random() * 1000);
        const newUser = new User(id, name, email);
        await this.userRepository.create(newUser);
    }
}
```

#### 5. Controlador (`UserController`)
```typescript
import { Request, Response } from 'express';

class UserController {
    constructor(private userService: UserService) {}

    async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const { name, email } = req.body;
        await this.userService.createUser(name, email);
        res.status(201).json({ message: 'User created' });
    }
}
```

---

### **Beneficios de usar interfaces**

1. **Desacoplamiento**:
   - El servicio no depende de una implementación concreta de `UserRepository`, sino de la interfaz `IUserRepository`.
   - Esto permite cambiar la implementación del repositorio sin modificar el servicio.

2. **Facilita las pruebas**:
   - Puedes crear un **mock** o **stub** de `IUserRepository` para probar el servicio sin necesidad de una base de datos real.

   ```typescript
   class MockUserRepository implements IUserRepository {
       async findAll(): Promise<User[]> {
           return [new User(1, "Mock User", "mock@example.com")];
       }

       // Implementar otros métodos...
   }

   // En una prueba
   const mockRepo = new MockUserRepository();
   const userService = new UserService(mockRepo);
   ```

3. **Extensibilidad**:
   - Si en el futuro necesitas un repositorio que use una base de datos diferente (por ejemplo, MongoDB en lugar de MySQL), solo necesitas crear una nueva clase que implemente `IUserRepository`.

---

