# Movie Recommendation API

**Estado:** En desarrollo 🚧

**Descripción**
Este proyecto ofrece un backend en NestJS (TypeScript) con PostgreSQL y un frontend en React (Vite) para recomendar películas. Implementa autenticación con JWT y Auth0 (Google/Facebook), manejo de usuarios, películas y comentarios vía API REST.

## Características

* CRUD de películas y comentarios
* Registro e inicio de sesión con JWT y Auth0
* Tests automáticos con Python (pytest) y Schemathesis
* Frontend en React con React Router y Hooks personalizados

## Tech Stack

* **Backend:** NestJS, TypeScript, TypeORM, PostgreSQL
* **Frontend:** React, Vite, React Router
* **Testing:** Python 3.8+, pytest, Schemathesis

## Requisitos

* Node.js ≥18 y npm o yarn
* PostgreSQL en funcionamiento
* Python ≥3.8 y pip

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

## Contribución

1. Crea una rama con prefijo `feature/` o `fix/`.
2. Realiza tus cambios e incluye logs con `console.log()` para debug.
3. Abre un Pull Request describiendo tus cambios.

---

¡Vamos con todo! Este README es tu guía rápida para seguir avanzando. Sigue puliendo features y pronto tendremos la primera versión estable.
