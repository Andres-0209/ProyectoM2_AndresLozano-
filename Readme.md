# 📝 MiniBlog API — Proyecto Integrador Módulo 2

> API RESTful desarrollada en Node.js, Express y PostgreSQL para la gestión integral de autores y publicaciones de blog (*posts*), con soporte de pruebas de integración automatizadas y documentación interactiva bajo el estándar OpenAPI 3.0.3.

---

### 🔗 Enlaces del Proyecto Desplegado

* **🌐 Servidor en Producción (Railway):** [proyectom2andreslozano-production.up.railway.app](https://proyectom2andreslozano-production.up.railway.app/)
* **📚 Documentación Swagger (OpenAPI UI):** [proyectom2andreslozano-production.up.railway.app/api-docs/](https://proyectom2andreslozano-production.up.railway.app/api-docs/)
* **📚 Endpoint de Autores:** [proyectom2andreslozano-production.up.railway.app/authors](proyectom2andreslozano-production.up.railway.app/authors)
* **📚 Endpoint de Posts** [proyectom2andreslozano-production.up.railway.app/posts](proyectom2andreslozano-production.up.railway.app/posts)



---

### 📌 Estado y Stack Principal

* **Estado del Proyecto:** `Finalizado` / `Funcional en Producción`
* **Tecnologías Principales:** Node.js (ES Modules), Express 5.2.1, PostgreSQL (`pg` 8.23.0), Vitest 5.0.1, Supertest 7.2.2, OpenAPI 3.0.3, Railway.

---

## 📑 Índice de Contenidos

1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Objetivos](#-objetivos)
3. [Relación con el Módulo 2](#-relación-con-el-módulo-2)
4. [Características y Funcionalidades](#-características-y-funcionalidades)
5. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
6. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
7. [Proceso de Despliegue en Railway](#-proceso-de-despliegue-en-railway)
8. [Matriz de Errores Encontrados y Soluciones](#-matriz-de-errores-encontrados-y-soluciones)
9. [Requisitos Previos e Instalación Local](#-requisitos-previos-e-instalación-local)
10. [Ejecución y Guía de Uso](#-ejecución-y-guía-de-uso)
11. [Endpoints Principales](#-endpoints-principales)
12. [Evidencias de Funcionamiento](#-evidencias-de-funcionamiento)
13. [Sobre el Uso de IA](#-sobre-el-uso-de-ia)
14. [Pruebas Automatizadas](#-pruebas-automatizadas)
15. [Manejo de Errores y Seguridad](#-manejo-de-errores-y-seguridad)
16. [Modelo de Base de Datos](#-modelo-de-base-de-datos)
17. [Decisiones Técnicas y Futuras Mejoras](#-decisiones-técnicas-y-futuras-mejoras)
18. [Conclusiones y Referencias](#-conclusiones-y-referencias)

---

## 📖 Descripción del Proyecto

**MiniBlog API** es el backend de una plataforma de publicaciones liviana diseñada para gestionar el ciclo de vida completo de autores y sus artículos asociados. El sistema resuelve el problema de organizar y consultar información estructurada mediante un modelo relacional entre dos entidades clave: **Autores** y **Publicaciones (Posts)**.

El sistema permite crear, consultar, actualizar y eliminar autores y posts, garantizando la integridad referencial de los datos a través de reglas como la **eliminación en cascada** de publicaciones al remover un autor. Fue desarrollado como Proyecto Integrador dentro del entorno académico del Módulo 2 para consolidar el diseño de servicios web backend robustos, manejo de bases de datos relacionales en la nube, modularización mediante arquitectura de rutas/controladores, pruebas automatizadas y especificación de contratos mediante OpenAPI / Swagger.

---

## 🎯 Objetivos

### Objetivo General
Diseñar e implementar una API RESTful completamente funcional utilizando **Node.js**, **Express** y **PostgreSQL** para administrar autores y publicaciones, garantizando persistencia relacional en la nube (Railway), manejo estructurado de errores, pruebas de integración automatizadas y documentación estandarizada.

### Objetivos Específicos
* **Modelar** una base de datos relacional PostgreSQL con tablas vinculadas por claves foráneas y restricciones de unicidad e integridad (`ON DELETE CASCADE`).
* **Implementar** un servidor HTTP modularizado en Express utilizando módulos de ECMAScript (`import`/`export`).
* **Desplegar** la base de datos y la aplicación Node.js en Railway configurando dominios públicos y variables de entorno.
* **Construir** endpoints REST con respuestas acordes a los códigos de estado HTTP estándar (`200`, `201`, `400`, `404`, `409`, `500`).
* **Garantizar** la calidad del código mediante pruebas de integración automatizadas utilizando Vitest y Supertest.
* **Especificar e integrar** Swagger UI en la ruta `/api-docs/` mediante la especificación OpenAPI 3.0.3 (`openapi.yaml`).
* **Documentar** de manera transparente la resolución de errores en despliegue y el uso colaborativo de herramientas de IA.

---

## 🎓 Relación con el Módulo 2

El desarrollo del proyecto MiniBlog API permitió aplicar de manera práctica e integrada los temas abordados a lo largo del Módulo 2:

* **Desarrollo Backend con Node.js y Express:** Estructuración mediante ES Modules (`"type": "module"`), separando servidor principal (`index.js`), rutas (`src/routes/`) y controladores (`src/controllers/`).
* **Bases de Datos Relacionales y SQL (PostgreSQL & Railway):** Modelado relacional DDL/DML, consultas parametrizadas (`pg`), conexión a PostgreSQL remoto mediante proxy/SSL y mantenimiento de integridad referencial.
* **Variables de Entorno y Configuración:** Uso de `dotenv` localmente y configuración del panel de variables en Railway para aislar credenciales como `DATABASE_URL` y `NODE_ENV`.
* **Despliegue Continuo:** Conexión del repositorio GitHub a Railway con compilación e inicialización automática.
* **Testing e Integración:** Desacople de `app.listen()` condicionado por `process.env.NODE_ENV !== "test"` para ejecutar Vitest sin bloquear puertos.

---

## ✨ Características y Funcionalidades

* **Gestión de Autores (CRUD):** Registro, consulta individual/general, edición y borrado de autores con validación de correo único (`UNIQUE`).
* **Gestión de Publicaciones (CRUD):** Creación, modificación, listado general y eliminación de artículos vinculados a autores válidos.
* **Eliminación en Cascada:** Al eliminar un autor (`DELETE /authors/{id}`), la restricción `ON DELETE CASCADE` elimina automáticamente todas sus publicaciones.
* **Consulta de Posts por Autor:** Endpoint filtrado (`GET /posts/author/{authorid}`) para consultar las publicaciones asociadas a un autor específico.
* **Documentación interactiva en Swagger:** Interfaz visual servida en `/api-docs/` para probar todos los endpoints directamente desde el navegador.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso en el proyecto |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.0.0` | Entorno de ejecución de JavaScript en el servidor |
| **Express** | `5.2.1` | Framework web para la creación de rutas, middlewares y servicios REST |
| **PostgreSQL (`pg`)** | `8.23.0` | Motor de base de datos relacional y cliente de conexión Node.js |
| **Dotenv** | `17.4.2` | Gestión e inyección de variables de entorno desde archivo `.env` |
| **Vitest** | `5.0.1` | Framework para la ejecución de pruebas unitarias e integración |
| **Supertest** | `7.2.2` | Librería de simulación de solicitudes HTTP para pruebas |
| **OpenAPI / Swagger**| `3.0.3` | Especificación e interfaz gráfica de documentación (`openapi.yaml`) |
| **Railway** | Cloud | Plataforma de alojamiento de la base de datos PostgreSQL y la aplicación Web |

---

## 🏗️ Arquitectura del Proyecto

```text
ProyectoM2_AndresLozano/
├── node_modules/
├── sql/
│   ├── seed.sql              # Datos semilla para la base de datos
│   └── setup.sql             # Creación de tablas e integridad referencial
├── src/
│   ├── config/
│   │   └── db.js             # Pool de conexión a PostgreSQL con soporte SSL
│   ├── controllers/
│   │   ├── authors.controller.js
│   │   └── posts.controller.js
│   └── routes/
│       ├── authors.routes.js
│       └── posts.routes.js
├── test/
│   └── api.test.js           # Pruebas automatizadas de integración
├── .env                      # Variables de entorno locales (ignorado en git)
├── .env.example              # Plantilla pública de variables de entorno
├── .gitignore                 # Archivos excluidos del control de versiones
├── index.js                  # Punto de entrada de la app Express
├── openapi.yaml              # Contrato de la API OpenAPI 3.0.3
├── package.json
└── README.md
```

---

## 🚀 Proceso de Despliegue en Railway

### Paso 1: Creación del Proyecto y Servicio PostgreSQL
1. Ingresar a **Railway.app** y crear un proyecto nuevo (*New Project*).
2. Seleccionar la opción **Provision PostgreSQL** para agregar una instancia de base de datos PostgreSQL en la nube.
3. Hacer clic sobre la tarjeta de la base de datos Postgres, ir a la pestaña **Settings** y en la sección **Networking** dar clic en el botón **Public Networking / Access Public** para habilitar la dirección de conexión externa (proxy).

### Paso 2: Configuración del Cliente SQL en VS Code (Database Client)
Para gestionar la base de datos remota desde Visual Studio Code usando la extensión **Database Client**:
1. En Railway, dentro de la tarjeta de Postgres, ir a la pestaña **Variables** o **Connect**.
2. Hacer clic en **Use connection string / Show Secret Values**.
3. Copiar las credenciales individuales expuestas por Railway:
   * `DATABASE_PUBLIC_URL` (Connection string pública)
   * `PGHOST` (Host del servidor proxy, ej. `crossover.proxy.rlwy.net`)
   * `PGPORT` (Puerto expuesto, ej. `39890`)
   * `PGUSER` (Usuario, ej. `postgres`)
   * `PGPASSWORD` (Contraseña generada)
   * `PGDATABASE` (Nombre de la BD, ej. `railway`)
4. En VS Code, abrir la extensión Database Client, presionar el botón de agregar nueva conexión PostgreSQL e ingresar los datos copiados en sus respectivos campos.
5. Guardar (*Save*) y conectar (*Connect*).

### Paso 3: Inicialización del Esquema SQL (`setup.sql` y `seed.sql`)
Para crear la estructura e insertar los datos iniciales en Railway:

* **Opción A (Desde VS Code):** Abrir los archivos `sql/setup.sql` y `sql/seed.sql` dentro de VS Code y ejecutarlos directamente sobre la conexión activa de Railway.
* **Opción B (Desde Terminal mediante `psql`):**

```bash
# 1. Crear las tablas en Railway
psql "postgresql://postgres:PASSWORD@HOST:PORT/railway" -c "SET client_encoding = 'UTF8';" -f sql/setup.sql

# 2. Insertar los datos semilla
psql "postgresql://postgres:PASSWORD@HOST:PORT/railway" -c "SET client_encoding = 'UTF8';" -f sql/seed.sql
```

### Paso 4: Despliegue del Servicio Web (Node.js)
1. En Railway, dentro del mismo proyecto, hacer clic en **+ Add -> GitHub Repo**.
2. Seleccionar el repositorio `ProyectoM2_AndresLozano`.
3. Ir a la pestaña **Variables** del nuevo servicio Web y agregar:
   * `DATABASE_URL`: Asignar el valor `${{Postgres.DATABASE_URL}}` o la cadena de conexión pública de Postgres.
   * `NODE_ENV`: Asignar el valor `production`.
4. Ir a la pestaña **Settings -> Networking** y presionar **Generate Domain** para obtener la URL pública del backend.

### Paso 5: Ajuste de Conexión SSL en `src/config/db.js`
Para permitir que Node.js se conecte de forma segura a PostgreSQL en Railway sin rechazar certificados SSL no firmados:

```javascript
import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export default db;
```

---

## 🚨 Matriz de Errores Encontrados y Soluciones

| Error Registrado | Causa Raíz | Solución Aplicada |
| :--- | :--- | :--- |
| `git: 'commmit' is not a git command` | Error tipográfico al escribir el comando git en la terminal. | Corregir la sintaxis y ejecutar `git commit -m "mensaje"`. |
| `ECONNREFUSED ::1:5432 / 127.0.0.1:5432` | La aplicación Node.js intentaba conectarse a la BD local por falta de variable `DATABASE_URL`. | Configurar la variable `DATABASE_URL` en el entorno y actualizar `src/config/db.js`. |
| `could not translate host name "postgres.railway.internal"` | La URL interna de Railway solo resuelve dentro de la red privada de Railway, no desde la máquina local. | Usar la URL pública / Proxy de la base de datos (`crossover.proxy.rlwy.net`) para conectarse localmente. |
| `duplicate key value violates unique constraint "authors_email_key"` | Intento de reinsertar registros de semillas que ya existían previamente en la base de datos. | Ejecutar `DROP TABLE IF EXISTS posts, authors CASCADE;` en PostgreSQL antes de volver a correr `setup.sql` y `seed.sql`. |
| `bash: postgresql://... No such file or directory` | Se intentó ejecutar directamente la URL de conexión en Bash omitiendo el comando `psql`. | Anteponer la herramienta `psql` antes de la cadena entre comillas: `psql "postgresql://..." -f script.sql`. |

---

## 💻 Requisitos Previos e Instalación Local

### Requisitos
* **Node.js** (v18+)
* **Git**
* **PostgreSQL local** o cuenta en **Railway**

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Andres-0209/ProyectoM2_AndresLozano-.git
cd ProyectoM2_AndresLozano-

# 2. Instalar dependencias
npm install
```

### Configuración de Variables de Entorno (`.env`)
Crear un archivo `.env` en la raíz tomando como base `.env.example`:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/miniblog
```

---

## ⚡ Ejecución y Guía de Uso

### Comandos de Ejecución

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start

# Ejecución de Pruebas Automatizadas
npm test
```

---

## 🔌 Endpoints Principales

| Método | Endpoint | Descripción |
| :---: | :--- | :--- |
| `GET` | `/` | Comprobación de estado del servidor |
| `GET` | `/api-docs/` | Documentación interactiva de Swagger UI |
| `GET` | `/authors` | Listar todos los autores |
| `POST` | `/authors` | Crear un nuevo autor |
| `GET` | `/authors/{id}` | Obtener autor por ID |
| `PUT` | `/authors/{id}` | Actualizar autor por ID |
| `DELETE` | `/authors/{id}` | Eliminar autor y sus publicaciones (*Cascade*) |
| `GET` | `/posts` | Listar todas las publicaciones con autor |
| `POST` | `/posts` | Crear una nueva publicación |
| `GET` | `/posts/{id}` | Obtener publicación por ID |
| `PUT` | `/posts/{id}` | Actualizar publicación por ID |
| `DELETE` | `/posts/{id}` | Eliminar una publicación |
| `GET` | `/posts/author/{authorid}` | Listar publicaciones de un autor específico |

---

## 📸 Evidencias de Funcionamiento

* **Evidencia 01 — Verificación del Servidor y Despliegue:** Confirmación de respuesta `200 OK` en la URL de producción de Railway: [proyectom2andreslozano-production.up.railway.app](https://proyectom2andreslozano-production.up.railway.app/).
* **Evidencia 02 — Interfaz Swagger UI:** Renderizado correcto de la especificación OpenAPI en `/api-docs/`.
* **Evidencia 03 — Conexión y Persistencia en PostgreSQL:** Ejecución exitosa de migraciones DDL/DML en Railway e interacción CRUD mediante Postman/Swagger.
* **Evidencia 04 — Suite de Pruebas con Vitest:** Ejecución limpia de `npm test` pasando la totalidad de casos de prueba.

---

## 🤖 Sobre el Uso de IA

El desarrollo de **MiniBlog API** contó con la asistencia de herramientas de Inteligencia Artificial (ChatGPT / Gemini) como recurso de tutoría técnica, siguiendo los lineamientos pedagógicos del Módulo 2.

### Prompts Destacados y Aprendizaje

1. **Configuración de Servidor para Testing:**
   * *Consulta:* ¿Cómo exportar `app` en Express para usar con Supertest y Vitest sin que marque error de puerto ocupado?
   * *Resultado:* Condicionar `app.listen()` mediante `process.env.NODE_ENV !== "test"`.
2. **Depuración de Errores PostgreSQL:**
   * *Consulta:* ¿Cómo capturar en Express el error de correo duplicado en PostgreSQL?
   * *Resultado:* Mapear el código `23505` de `pg` para retornar un código HTTP `409 Conflict`.
3. **Estrategia SSL en Railway:**
   * *Consulta:* ¿Por qué la BD de Railway rechaza la conexión de Node.js en producción?
   * *Resultado:* Habilitar `ssl: { rejectUnauthorized: false }` condicionado a `NODE_ENV === 'production'`.

---

## 🧪 Pruebas Automatizadas

Suite de integración implementada en `test/api.test.js` con **Vitest** y **Supertest**:

| Caso | Endpoint | Entrada | Resultado Esperado | Estado |
| :---: | :--- | :--- | :--- | :---: |
| **01** | `GET /` | N/A | Status `200 OK` | ✅ Pasó |
| **02** | `GET /authors` | N/A | Status `200` + Array de autores | ✅ Pasó |
| **03** | `POST /authors` | JSON válido | Status `201 Created` + ID asignado | ✅ Pasó |
| **04** | `POST /authors` | Email duplicado | Status `409 Conflict` | ✅ Pasó |
| **05** | `GET /posts` | N/A | Status `200` + Array con `author_name` | ✅ Pasó |
| **06** | `POST /posts` | `author_id` inválido | Status `400 Bad Request` | ✅ Pasó |

---

## 🔒 Manejo de Errores y Seguridad

* **Consultas Parametrizadas:** Previene vulnerabilidades de Inyección SQL mediante el uso de `$1`, `$2` en las consultas con `pg`.
* **Mapeo de Códigos HTTP:**
  * `400 Bad Request`: Datos de entrada incompletos o inválidos.
  * `404 Not Found`: Recurso no existente en la base de datos.
  * `409 Conflict`: Violación de restricción de unicidad (email duplicado).
  * `500 Internal Server Error`: Captura centralizada en middleware global ocultando trazas en producción.
* **Aislamiento de Secretos:** Exclusión de credenciales sensibles mediante `.gitignore`.

---

## 🗄️ Modelo de Base de Datos

### Tabla: `authors`

```sql
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: `posts`

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 💡 Decisiones Técnicas y Futuras Mejoras

### Decisiones Técnicas
* **Express 5.2.1 & ES Modules:** Adopción de sintaxis moderna `import`/`export` para mantener compatibilidad con el ecosistema actual de JavaScript.
* **Conexión mediante Pool de `pg`:** Optimización del manejo de clientes y reutilización de conexiones hacia PostgreSQL.
* **Integridad Referencial Integrada (`ON DELETE CASCADE`):** Delegación de la limpieza de datos relacionales directamente al motor de la base de datos.
* **Despliegue Unificado en Railway:** Centralización tanto de la BD relacional como de la app Node.js en la misma plataforma para reducir la latencia.

### Limitaciones Actuales y Mejoras Futuras

* **Limitaciones:**
  * No incluye autenticación mediante JWT o sesiones de usuario.
  * Retorna el total de los registros sin paginación en lecturas masivas.
* **Mejoras Futuras:**
  1. Implementar módulo de autenticación y autorización con `bcrypt` y `JWT`.
  2. Agregar paginación con `limit` y `offset` en los endpoints de consulta.
  3. Incorporar manejo de categorías o etiquetas con relaciones muchos a muchos ($N:M$).

---

## 🏁 Conclusiones y Referencias

### Conclusiones
El Proyecto Integrador **MiniBlog API** permitió consolidar de forma práctica todas las competencias del Módulo 2: desde la arquitectura modular backend en Node.js/Express y la interacción relacional con PostgreSQL, hasta la puesta en producción en Railway, la resolución de errores de despliegue/SSL y la automatización de pruebas e integración de Swagger.

### Referencias
* [Documentación Oficial de Express.js](https://expressjs.com/)
* [Documentación de node-postgres (`pg`)](https://node-postgres.com/)
* [Documentación de Railway Docs](https://docs.railway.app/)
* [Especificación OpenAPI 3.0.3](https://swagger.io/specification/)
* [Documentación de Vitest](https://vitest.dev/)