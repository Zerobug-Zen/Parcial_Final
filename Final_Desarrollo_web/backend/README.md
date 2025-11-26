# TasteFlow — Backend

Servidor Node.js + Express con JWT y MongoDB para reseñas de restaurantes.

## Env

Configurar `.env`:

```
JWT_SECRET=changeme
MONGO_URI=mongodb://localhost:27017/reviewsdb
PORT=4000
FRONTEND_ORIGIN=http://localhost:3000
```

## Scripts

- `npm start` — inicia servidor en `http://localhost:4000`
- `npm run dev` — desarrollo con nodemon
- `npm test` — tests (usa `mongodb-memory-server`)
- `npm run seed` — inserta usuarios y reseñas demo

## Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login` → `{ token, userId, user: { id, name, email } }`
- `GET /api/reviews` (Bearer)
- `POST /api/reviews` (Bearer)
- `GET /api/reviews/:id` (Bearer, owner-only)
- `PUT /api/reviews/:id` (Bearer, owner-only)
- `DELETE /api/reviews/:id` (Bearer, owner-only)

## Ejemplos

Login:

```
POST /api/auth/login
{ "email": "demo1@example.com", "password": "secret123" }
```

Respuesta:

```
{
  "status":200,
  "message":"Logged in",
  "token":"<jwt>",
  "userId":"<id>",
  "user": { "id":"<id>", "name":"Demo One", "email":"demo1@example.com" }
}
```

## Seguridad
- `helmet`, `cors` restringido al frontend, `express-rate-limit`.
- Validaciones y sanitización con `express-validator`.
- Middleware JWT en `Authorization: Bearer <token>`.

## Instalación y ejecución
1. Ir a `backend/`
2. Instalar dependencias: `npm install`
3. Cargar datos demo (recomendado si el frontend no tiene registro): `npm run seed`
4. Iniciar servidor: `npm start`
5. El backend escucha en `http://localhost:4000` y exige Bearer JWT en las rutas de reseñas.

## Errores comunes y soluciones
- Conexión MongoDB fallida:
  - Verificar `MONGO_URI` en `.env` y que el servicio esté activo.
- 401 Unauthorized:
  - Falta la cabecera `Authorization` o token inválido; iniciar sesión desde el frontend.
- 403 Forbidden:
  - Intento de operar reseñas ajenas; solo el propietario puede ver/editar/eliminar.
- CORS:
  - Ajustar `FRONTEND_ORIGIN` en `.env` para que coincida con la URL del frontend.
- Puerto ocupado:
  - Cambiar `PORT` en `.env` y reiniciar.