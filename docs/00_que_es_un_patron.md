## **¿Qué es un Patrón de Diseño (Design Pattern)?**  

Un **Patrón de Diseño** es una **solución reutilizable** a un problema común en el diseño de software. En lugar de reinventar la rueda cada vez que se enfrenta un problema, los patrones proporcionan estructuras probadas y optimizadas para resolverlos de manera eficiente.  

> **En otras palabras:** Un patrón de diseño es como una receta para solucionar problemas de diseño de código de forma estructurada y reutilizable.

---

## **¿Para qué sirven los Patrones de Diseño?**  

Los patrones de diseño tienen varios beneficios en el desarrollo de software:  

1. **Reutilización de Código:**  
   - Evitan repetir código y permiten utilizar soluciones probadas en múltiples proyectos.  

2. **Mantenimiento y Escalabilidad:**  
   - Facilitan la lectura, mantenimiento y expansión del código en el futuro.  

3. **Buenas Prácticas:**  
   - Promueven principios como **separación de responsabilidades (SRP)**, **bajo acoplamiento** y **alta cohesión**.  

4. **Facilitan la colaboración:**  
   - Son estándares conocidos en la industria, lo que permite que otros programadores comprendan el código más fácilmente.  

---

## **Tipos de Patrones de Diseño**  

Los patrones de diseño se pueden clasificar en tres grandes categorías:

### **1. Patrones Creacionales** 🏗️  
Estos patrones se centran en la **creación de objetos**, asegurando que se haga de manera controlada y optimizada.  

🔹 **Ejemplos:**  
- **Singleton** → Garantiza que solo haya una única instancia de una clase en toda la aplicación.  
- **Factory Method** → Permite crear objetos sin exponer la lógica de creación directamente.  
- **Builder** → Facilita la construcción de objetos complejos paso a paso.  

---

### **2. Patrones Estructurales** 🏢  
Se enfocan en cómo **organizar y estructurar el código** para mejorar la legibilidad y modularidad.  

🔹 **Ejemplos:**  
- **Adapter** → Permite que dos clases con interfaces incompatibles trabajen juntas.  
- **Decorator** → Agrega funcionalidades a un objeto sin modificar su código original.  
- **Facade** → Proporciona una interfaz simplificada para un conjunto de clases o un sistema complejo.  

---

### **3. Patrones de Comportamiento** 🔄  
Estos patrones definen **cómo interactúan los objetos y se comunican entre sí**.  

🔹 **Ejemplos:**  
- **Observer** → Permite que un objeto notifique cambios a otros objetos interesados.  
- **Strategy** → Permite seleccionar una estrategia de comportamiento en tiempo de ejecución.  
- **Repository** → Abstrae la lógica de acceso a datos para desacoplar la base de datos de la lógica de negocio.  

---

## **Ejemplo de un Patrón de Diseño en TypeScript**  

Supongamos que queremos garantizar que solo haya una única instancia de una clase en toda la aplicación (**Singleton Pattern**):  

```typescript
class Singleton {
    private static instance: Singleton;

    private constructor() {
        console.log("Instancia creada");
    }

    static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    sayHello() {
        console.log("Hola, soy un Singleton");
    }
}

const instancia1 = Singleton.getInstance();
const instancia2 = Singleton.getInstance();

console.log(instancia1 === instancia2); // true (es la misma instancia)
```

---

## **Conclusión**  
Los patrones de diseño son herramientas fundamentales para estructurar el código de manera eficiente. Nos permiten escribir software más limpio, modular y fácil de mantener.  

Si bien **no es obligatorio usarlos en todos los casos**, conocerlos y aplicarlos correctamente mejora la calidad del código y la colaboración en proyectos grandes. 🚀