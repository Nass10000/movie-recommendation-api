

# Movie Recommendation API


**Descripción**  
Este es un proyecto simple pero funcional, que implementa una aplicación de recomendación de películas con arquitectura full stack. El backend está desarrollado con NestJS (TypeScript) y utiliza PostgreSQL como base de datos. El frontend está construido con React (Vite), ofreciendo una interfaz ligera y moderna.

La aplicación incluye autenticación con JWT y Auth0 (Google/Facebook), manejo de usuarios, películas y comentarios a través de una API REST estructurada. Además, incorpora un microservicio en Python para realizar un análisis básico de sentimientos sobre los comentarios, lo que añade una dimensión analítica sencilla pero efectiva a las recomendaciones.

Ideal como punto de partida para proyectos más complejos o como demostración de una arquitectura escalable y modular.

## API Deploy

La API está desplegada en Render y disponible en:

[https://movie-recommendation-api-1xwj.onrender.com](https://movie-recommendation-api-1xwj.onrender.com)

Puedes usar esta URL para hacer peticiones desde tu frontend o herramientas como Postman.

## Características

* CRUD de películas y comentarios.
* Registro e inicio de sesión con JWT y Auth0 (Google/Facebook).
* Evaluación de sentimientos con Python.
* Tests automáticos con Python (pytest) y Schemathesis para validar endpoints.
* Frontend en React con React Router y Hooks personalizados.
* **Entorno dockerizado con Docker y Docker Compose**.

## Tech Stack

* **Backend:** NestJS, TypeScript, TypeORM, PostgreSQL.
* **Frontend:** React, Vite, React Router.
* **Testing:** Python 3.8+, pytest, Schemathesis.
* **Contenedores:** Docker, Docker Compose.

## Requisitos

* Node.js ≥18 y npm o yarn.
* PostgreSQL en funcionamiento.
* Python ≥3.8 y pip.
* Docker y Docker Compose (opcional pero recomendado).

## Instalación y puesta en marcha

1. Clona el repositorio:

   ```bash
   git clone <URL-del-repositorio>
   ```

2. Configura las variables de entorno en `back/.env`:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=tuPassword
   DB_NAME=movie_recommender
   JWT_SECRET=tuJWTSecret
   AUTH0_DOMAIN=tuAuth0Domain
   AUTH0_CLIENT_ID=tuClientId
   AUTH0_CLIENT_SECRET=tuClientSecret
   ```

3. Instala dependencias del backend:

   ```bash
   cd back
   npm install
   ```

4. Instala dependencias del frontend:

   ```bash
   cd ../front
   npm install
   ```

## En desarrollo

* **Backend:**

   ```bash
   cd back
   npm run start:dev
   ```

* **Frontend:**

   ```bash
   cd front
   npm run dev
   ```

## Testing de la API

1. Desde `back/src`:

   ```bash
   pip install -r requirements.txt  # si existe, o instala pytest y requests
   pytest
   ```

2. Validación automatizada de endpoints con Schemathesis:

   ```bash
   schemathesis run <URL-de-tu-API>
   ```

## Contribución

1. Crea una rama con prefijo `feature/` o `fix/`.
2. Realiza tus cambios e incluye logs con `console.log()` para debug.
3. Abre un Pull Request describiendo tus cambios.

---

