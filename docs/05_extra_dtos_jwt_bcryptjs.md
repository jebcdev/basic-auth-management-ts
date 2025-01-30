## **¿Qué es un DTO (Data Transfer Object)?**

### **Definición**

Un **DTO (Data Transfer Object)** es un patrón de diseño que se utiliza para encapsular y transferir datos entre diferentes partes de una aplicación, como entre el cliente y el servidor, o entre capas de la aplicación (por ejemplo, entre el controlador y el servicio).

### **Propósito**

1. **Desacoplamiento**: Separa la estructura de los datos de la lógica de negocio.
2. **Validación**: Permite validar los datos de entrada antes de procesarlos.
3. **Seguridad**: Evita exponer datos sensibles o innecesarios (por ejemplo, contraseñas).
4. **Eficiencia**: Reduce la cantidad de datos transferidos, enviando solo lo necesario.

### **Características**

-   Un DTO es un **objeto plano** (sin lógica de negocio).
-   Suele ser una clase o interfaz en TypeScript.
-   Puede incluir decoradores de validación (usando `class-validator`) y transformación (usando `class-transformer`).

---

## **Ejemplo de DTO para un Producto**

Vamos a crear dos DTOs para un producto:

1. **CreateProductDto**: Para la creación de un producto.
2. **UpdateProductDto**: Para la actualización de un producto.

---

### **1. DTO para Crear un Producto (`CreateProductDto`)**

Este DTO define los datos necesarios para crear un producto. Incluye validaciones para asegurar que los datos sean correctos.

```typescript
// src/dto/CreateProductDto.ts
import {
    IsString,
    IsNumber,
    Min,
    IsNotEmpty,
    IsOptional,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateProductDto {
    @IsString({ message: "El nombre debe ser un texto" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    name: string;

    @IsString({ message: "La descripción debe ser un texto" })
    @IsOptional() // Campo opcional
    description?: string;

    @IsNumber({}, { message: "El precio debe ser un número" })
    @Min(0, { message: "El precio no puede ser negativo" })
    @Transform(({ value }) => parseFloat(value)) // Transformar a número
    price: number;

    @IsNumber({}, { message: "El stock debe ser un número" })
    @Min(0, { message: "El stock no puede ser negativo" })
    @Transform(({ value }) => parseInt(value)) // Transformar a número entero
    stock: number;
}
```

#### **Explicación**

-   **`@IsString`**: Valida que el campo sea una cadena de texto.
-   **`@IsNotEmpty`**: Valida que el campo no esté vacío.
-   **`@IsOptional`**: Indica que el campo es opcional.
-   **`@IsNumber`**: Valida que el campo sea un número.
-   **`@Min`**: Valida que el número sea mayor o igual al valor especificado.
-   **`@Transform`**: Transforma el valor (por ejemplo, convierte una cadena en un número).

---

### **2. DTO para Actualizar un Producto (`UpdateProductDto`)**

Este DTO define los datos que se pueden actualizar en un producto. A diferencia del DTO de creación, todos los campos son opcionales.

```typescript
// src/dto/UpdateProductDto.ts
import { IsString, IsNumber, Min, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateProductDto {
    @IsString({ message: "El nombre debe ser un texto" })
    @IsOptional() // Campo opcional
    name?: string;

    @IsString({ message: "La descripción debe ser un texto" })
    @IsOptional() // Campo opcional
    description?: string;

    @IsNumber({}, { message: "El precio debe ser un número" })
    @Min(0, { message: "El precio no puede ser negativo" })
    @Transform(({ value }) => parseFloat(value)) // Transformar a número
    @IsOptional() // Campo opcional
    price?: number;

    @IsNumber({}, { message: "El stock debe ser un número" })
    @Min(0, { message: "El stock no puede ser negativo" })
    @Transform(({ value }) => parseInt(value)) // Transformar a número entero
    @IsOptional() // Campo opcional
    stock?: number;
}
```

#### **Explicación**

-   **`@IsOptional`**: Todos los campos son opcionales, ya que en una actualización no es necesario enviar todos los datos.
-   **`@Transform`**: Se usa para transformar los valores (por ejemplo, convertir cadenas en números).

---

### **Uso de los DTOs en un Controlador**

Ahora veamos cómo usar estos DTOs en un controlador para crear y actualizar productos.

```typescript
// src/controller/ProductController.ts
import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateProductDto } from "../dto/CreateProductDto";
import { UpdateProductDto } from "../dto/UpdateProductDto";

export class ProductController {
    async createProduct(req: Request, res: Response): Promise<void> {
        // Transformar el cuerpo de la solicitud a CreateProductDto
        const createProductDto = plainToClass(
            CreateProductDto,
            req.body
        );

        // Validar el DTO
        const errors = await validate(createProductDto);
        if (errors.length > 0) {
            res.status(400).json({
                message: "Datos inválidos",
                errors,
            });
            return;
        }

        // Lógica para crear el producto (aquí iría la llamada al servicio)
        res.status(201).json({
            message: "Producto creado",
            data: createProductDto,
        });
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        const productId = parseInt(req.params.id, 10);

        // Transformar el cuerpo de la solicitud a UpdateProductDto
        const updateProductDto = plainToClass(
            UpdateProductDto,
            req.body
        );

        // Validar el DTO
        const errors = await validate(updateProductDto);
        if (errors.length > 0) {
            res.status(400).json({
                message: "Datos inválidos",
                errors,
            });
            return;
        }

        // Lógica para actualizar el producto (aquí iría la llamada al servicio)
        res.json({
            message: "Producto actualizado",
            productId,
            data: updateProductDto,
        });
    }
}
```

#### **Explicación**

1. **`plainToClass`**: Transforma el cuerpo de la solicitud (que es un objeto plano) en una instancia del DTO.
2. **`validate`**: Valida el DTO usando las reglas definidas en los decoradores.
3. Si hay errores de validación, se devuelve una respuesta con código `400` y los errores.
4. Si los datos son válidos, se procede con la lógica de negocio (crear o actualizar el producto).

---

### **Resumen**

-   **DTO (Data Transfer Object)**: Es un patrón para transferir datos de manera segura y validada.
-   **CreateProductDto**: Define los datos necesarios para crear un producto, con validaciones y transformaciones.
-   **UpdateProductDto**: Define los datos que se pueden actualizar en un producto, con campos opcionales.
-   **Uso en el controlador**: Se transforma y valida el cuerpo de la solicitud antes de procesarlo.

---

### **Conclusión**

Los DTOs son una herramienta poderosa para manejar datos de entrada en una aplicación. Con **class-validator** y **class-transformer**, puedes asegurarte de que los datos sean válidos y estén en el formato correcto antes de procesarlos.

---

### **JWT (JSON Web Token)**

JWT es un estándar abierto para la transmisión segura de información en formato JSON entre partes. Se compone de tres partes:

1. **Header** (tipo de token y algoritmo de firma).
2. **Payload** (datos o claims).
3. **Signature** (firma generada con una clave secreta).

**Ejemplo básico de uso:**

```typescript
import jwt from "jsonwebtoken";

const SECRET_KEY = "clave_secreta";

// Generar un token
const payload = { id: 1, email: "usuario@example.com" };
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
console.log("Token:", token);

// Verificar un token
try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token decodificado:", decoded);
} catch (error) {
    console.log("Token inválido");
}
```

---

### **bcryptjs**

bcryptjs es una librería para **hashear y verificar contraseñas** de forma segura. Usa el algoritmo bcrypt, que añade "salt" y es resistente a ataques de fuerza bruta.

**Ejemplo básico de uso:**

```typescript
import bcrypt from "bcryptjs";

const password = "contraseña123";

// Hashear una contraseña
const saltRounds = 10;
bcrypt.hash(password, saltRounds).then((hashedPassword) => {
    console.log("Hash:", hashedPassword);

    // Comparar una contraseña con su hash
    bcrypt.compare(password, hashedPassword).then((isMatch) => {
        console.log("¿Coincide?", isMatch);
    });
});
```