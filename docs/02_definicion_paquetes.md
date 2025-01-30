## **TypeORM, class-transformer y class-validator**

---

### **1. TypeORM**

#### **¿Qué es TypeORM?**
TypeORM es un **ORM (Object-Relational Mapping)** para TypeScript y JavaScript. Te permite interactuar con una base de datos usando objetos y clases en lugar de escribir consultas SQL manuales. Soporta múltiples bases de datos como MySQL, PostgreSQL, SQLite, MongoDB, etc.

#### **¿Para qué sirve?**
- **Mapear entidades**: Convierte las tablas de la base de datos en clases de TypeScript.
- **Realizar operaciones CRUD**: Crear, Leer, Actualizar y Eliminar registros de la base de datos usando métodos de objetos.
- **Manejar relaciones**: Define relaciones entre tablas (uno a uno, uno a muchos, muchos a muchos).
- **Migrations**: Gestiona cambios en la estructura de la base de datos.

#### **Cómo se usa**

##### Instalación
Primero, instala TypeORM y un driver de base de datos (por ejemplo, para PostgreSQL):
```bash
npm install typeorm pg reflect-metadata
```

##### Configuración
Crea un archivo `ormconfig.json` para configurar la conexión a la base de datos:
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "tu_usuario",
  "password": "tu_contraseña",
  "database": "tu_base_de_datos",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"]
}
```

##### Definir una entidad
Una entidad es una clase que representa una tabla en la base de datos. Usa decoradores de TypeORM para definirla:
```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}
```

##### Operaciones CRUD
Aquí tienes un ejemplo de cómo usar TypeORM para realizar operaciones CRUD:
```typescript
import { createConnection } from "typeorm";
import { User } from "./entity/User";

async function main() {
    const connection = await createConnection();

    // Crear un usuario
    const user = new User();
    user.name = "John Doe";
    user.email = "john.doe@example.com";
    await connection.manager.save(user);

    // Leer usuarios
    const users = await connection.manager.find(User);
    console.log(users);

    // Actualizar un usuario
    user.name = "Jane Doe";
    await connection.manager.save(user);

    // Eliminar un usuario
    await connection.manager.remove(user);

    await connection.close();
}

main();
```

---

### **2. class-transformer**

#### **¿Qué es class-transformer?**
`class-transformer` es una librería que te permite transformar objetos planos (como JSON) en instancias de clases y viceversa. Es útil cuando trabajas con datos que vienen de una API o una base de datos y necesitas convertirlos en objetos de TypeScript.

#### **¿Para qué sirve?**
- **Transformar JSON a clases**: Convierte objetos JSON en instancias de clases.
- **Transformar clases a JSON**: Convierte instancias de clases en objetos JSON.
- **Excluir propiedades**: Omite ciertas propiedades al convertir a JSON.
- **Transformar propiedades**: Cambia el formato de las propiedades (por ejemplo, fechas).

#### **Cómo se usa**

##### Instalación
```bash
npm install class-transformer
```

##### Ejemplo básico
```typescript
import { plainToClass, classToPlain } from "class-transformer";

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

// JSON plano
const userJson = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com"
};

// Transformar JSON a clase
const user = plainToClass(User, userJson);
console.log(user); // Instancia de User

// Transformar clase a JSON
const userPlain = classToPlain(user);
console.log(userPlain); // Objeto plano
```

##### Excluir propiedades
Puedes usar el decorador `@Exclude` para omitir propiedades al convertir a JSON:
```typescript
import { Exclude } from "class-transformer";

class User {
    id: number;
    name: string;

    @Exclude()
    password: string;
}

const user = new User();
user.id = 1;
user.name = "John Doe";
user.password = "123456";

const userPlain = classToPlain(user);
console.log(userPlain); // { id: 1, name: "John Doe" }
```

---

### **3. class-validator**

#### **¿Qué es class-validator?**
`class-validator` es una librería que te permite validar objetos usando decoradores. Es útil para validar datos de entrada (por ejemplo, en una API) antes de procesarlos.

#### **¿Para qué sirve?**
- **Validar datos**: Asegura que los datos cumplan con ciertas reglas (por ejemplo, que un campo sea un email válido).
- **Decoradores**: Usa decoradores como `@IsEmail`, `@IsString`, `@MinLength`, etc., para definir reglas de validación.
- **Integración con TypeORM**: Puedes usar `class-validator` para validar entidades antes de guardarlas en la base de datos.

#### **Cómo se usa**

##### Instalación
```bash
npm install class-validator
```

##### Ejemplo básico
```typescript
import { validate, IsEmail, MinLength } from "class-validator";

class User {
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    name: string;

    @IsEmail({}, { message: "El email no es válido" })
    email: string;
}

const user = new User();
user.name = "Jo"; // Nombre demasiado corto
user.email = "invalid-email"; // Email inválido

validate(user).then(errors => {
    if (errors.length > 0) {
        console.log("Errores de validación:", errors);
    } else {
        console.log("Datos válidos");
    }
});
```

##### Integración con TypeORM
Puedes usar `class-validator` para validar entidades antes de guardarlas en la base de datos:
```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, MinLength } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(3)
    name: string;

    @Column()
    @IsEmail()
    email: string;
}
```

---

### **Resumen de uso conjunto**

1. **TypeORM**: Para interactuar con la base de datos usando entidades.
2. **class-transformer**: Para transformar JSON en instancias de clases y viceversa.
3. **class-validator**: Para validar datos antes de procesarlos.

#### Ejemplo completo
```typescript
import { createConnection } from "typeorm";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { User } from "./entity/User";

async function main() {
    const connection = await createConnection();

    // JSON plano (simulando datos de una API)
    const userJson = {
        name: "Jo",
        email: "invalid-email"
    };

    // Transformar JSON a clase
    const user = plainToClass(User, userJson);

    // Validar datos
    const errors = await validate(user);
    if (errors.length > 0) {
        console.log("Errores de validación:", errors);
        return;
    }

    // Guardar en la base de datos
    await connection.manager.save(user);
    console.log("Usuario guardado");

    await connection.close();
}

main();
```

---

### **Conclusión**

- **TypeORM**: Simplifica el acceso a la base de datos usando entidades y decoradores.
- **class-transformer**: Facilita la transformación entre JSON y clases.
- **class-validator**: Asegura que los datos cumplan con las reglas de validación.

Estas herramientas son **esenciales** para construir aplicaciones backend robustas y mantenibles con TypeScript. ¡Ahora estás listo para usarlas en tus proyectos! 🚀
