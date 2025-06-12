Movie Recommendation API
Estado: En desarrollo 🚧

Descripción
Este proyecto ofrece un backend en NestJS (TypeScript) con PostgreSQL y un frontend en React (Vite) para recomendar películas. Implementa autenticación con JWT y Auth0 (Google/Facebook), manejo de usuarios, películas y comentarios vía API REST.

Características
CRUD de películas y comentarios

Registro e inicio de sesión con JWT y Auth0

Tests automáticos con Python (pytest) y Schemathesis

Frontend en React con React Router y Hooks personalizados

Entorno dockerizado con Docker y Docker Compose

Tech Stack
Backend: NestJS, TypeScript, TypeORM, PostgreSQL

Frontend: React, Vite, React Router

Testing: Python 3.8+, pytest, Schemathesis

Contenedores: Docker, Docker Compose

Requisitos
Node.js ≥18 y npm o yarn

PostgreSQL en funcionamiento

Python ≥3.8 y pip

Docker y Docker Compose (opcional pero recomendado)

Instalación y puesta en marcha
Clona el repositorio:

bash
Copiar
Editar
git clone <URL-del-repositorio>
Configura las variables de entorno en back/.env:

env
Copiar
Editar
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tuPassword
DB_NAME=movie_recommender
JWT_SECRET=tuJWTSecret
AUTH0_DOMAIN=tuAuth0Domain
AUTH0_CLIENT_ID=tuClientId
AUTH0_CLIENT_SECRET=tuClientSecret
Instala dependencias del backend:

bash
Copiar
Editar
cd back
npm install
Instala dependencias del frontend:

bash
Copiar
Editar
cd ../front
npm install
En desarrollo
Backend:

bash
Copiar
Editar
cd back
npm run start:dev
Frontend:

bash
Copiar
Editar
cd front
npm run dev
Testing de la API
Desde back/src:

bash
Copiar
Editar
pip install -r requirements.txt  # si existe, o instala pytest y requests
pytest
Contribución
Crea una rama con prefijo feature/ o fix/.

Realiza tus cambios e incluye logs con console.log() para debug.

Abre un Pull Request describiendo tus cambios.

