# 🔒 Basic Auth Management Ts 🔒

¡Bienvenido a **Basic Auth Management Ts**! 🎉 Este proyecto es una implementación básica de un sistema de autenticación y gestión de usuarios y roles usando **TypeScript**, **TypeORM**, **class-validator**, **class-transformer** y **MySQL**. 🛠️

-   **Teoría básica** conceptos generáles. 📚
-   **Instalación y configuración** de TypeORM con MySQL, class-validator y class-transformer. 
-   **CRUD de Roles**: Crear, leer, actualizar y eliminar roles. 👥

## 🚀 Próximamente...

En este proyecto, exploraremos cómo implementar un sistema de autenticación básico, por aca una introducción:

-   **CRUD de Usuarios**: Crear, leer, actualizar y eliminar usuarios. 👤
    ❌❌❌: Corregir    que no se pueda crear un usuario sin un role existente
    ❌❌❌: Corregir    que guarde los datos de la relacion al crear un usuario
    ❌❌❌: Corregir    como se guardan las contraseñas
-   **Módulo de Autenticación**: Login, registro y perfil de usuario. 🔐
-   **Protección de Rutas**: Restringir el acceso a rutas según el rol del usuario. 🛡️

---

## 🛠️ Funcionalidades

### 👥 CRUD de Roles

-   **Crear Rol**: Define nuevos roles en el sistema.
-   **Leer Roles**: Obtén una lista de todos los roles.
-   **Actualizar Rol**: Modifica los detalles de un rol existente.
-   **Eliminar Rol**: Elimina un rol del sistema.

### 👤 CRUD de Usuarios

-   **Crear Usuario**: Registra nuevos usuarios en el sistema.
-   **Leer Usuarios**: Obtén una lista de todos los usuarios.
-   **Actualizar Usuario**: Modifica los detalles de un usuario existente.
-   **Eliminar Usuario**: Elimina un usuario del sistema.

### 🔐 Módulo de Autenticación

-   **Login**: Inicia sesión con un usuario registrado.
-   **Registro**: Crea una nueva cuenta de usuario.
-   **Perfil**: Muestra la información del usuario autenticado.

### 🛡️ Protección de Rutas

-   **Rutas Protegidas**: Restringe el acceso a ciertas rutas según el rol del usuario.
-   **Middleware de Autenticación**: Verifica si el usuario está autenticado.
-   **Middleware de Autorización**: Verifica si el usuario tiene el rol necesario para acceder a una ruta.

---

## 🚀 Clonar el Proyecto

Para comenzar a trabajar en este proyecto, clona el repositorio:

```bash
git clone https://github.com/jebcdev/basic-auth-management-ts/
```

---

## 📝 Contribuciones

¡Las contribuciones son bienvenidas! 🎉 Si tienes alguna idea, sugerencia o encuentras algún error, no dudes en abrir un **issue** o enviar un **pull request**. 🤝

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.

---

¡Gracias por visitar **Basic Auth Management Ts**! 🎉 Esperamos que este proyecto te sea de gran utilidad. ¡Diviértete codificando! 🚀👨‍💻👩‍💻
