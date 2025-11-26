# TasteFlow — Reseñas de Restaurantes (Full Stack)

Aplicación completa: Frontend en React + Bootstrap 5 y Backend en Node.js + Express con MongoDB. Autenticación con JWT almacenado en `sessionStorage`. CRUD de reseñas estrictamente owner-only.

## Estructura del proyecto
- `frontend/`: UI React con rutas protegidas, login y CRUD.
- `backend/`: APIs REST con Express, JWT, validaciones y seguridad.

## Requisitos previos
- Node.js 18+
- MongoDB local o Compass (`MONGO_URI`) funcionando
- Navegador moderno

## Clonar y preparar entorno
1. Clonar repo:
   - `git clone <URL_DEL_REPO>`
   - `cd <CARPETA_DEL_REPO>`
2. Backend:
   - Crear `backend/.env`:
     - `JWT_SECRET=changeme`
     - `MONGO_URI=mongodb://localhost:27017/reviewsdb`
     - `PORT=4000`
     - `FRONTEND_ORIGIN=http://localhost:3000`
   - Instalar: `cd backend && npm install`
   - Semilla obligatoria si no hay pantalla de registro (recomendado): `npm run seed`
   - Iniciar: `npm start` (escucha en `http://localhost:4000`)
3. Frontend:
   - `cd ../frontend && npm install`
   - Opción A (desarrollo): `npm start` (auto abre `http://localhost:3000`)
   - Opción B (producción local): `npm run build` y `npx serve -s build -l 3000`

## Cómo iniciar sesión (no hay registro en frontend)
- Usa los usuarios de prueba creados por el seed:
  - Usuario 1: `demo1@example.com` / `secret123`
  - Usuario 2: `demo2@example.com` / `secret123`
- Navega a `http://localhost:3000/login` y autentícate.
- El token se guarda en `sessionStorage` y se envía en `Authorization: Bearer <token>`.

## Funcionalidad (CRUD de reseñas)
- Campos de la reseña:
  - Nombre del restaurante
  - Calificación (0–5)
  - Fecha de la visita
  - Observaciones
- Operaciones:
  - Listar solo tus reseñas (`GET /api/reviews`)
  - Crear (`POST /api/reviews`)
  - Editar (`PUT /api/reviews/:id`)
  - Eliminar (`DELETE /api/reviews/:id`)
- Regla de propiedad: si no eres el dueño de la reseña, el backend responde `403 Forbidden` en `GET/PUT/DELETE /api/reviews/:id`.

## Endpoints principales (Backend)
- `POST /api/auth/register` (opcional, no usado por el frontend actual)
- `POST /api/auth/login` → `{ token, userId, user }`
- `GET /api/reviews` → listado del usuario autenticado
- `POST /api/reviews` → crea asociando `userId` del token
- `GET /api/reviews/:id` → 403 si no pertenece al usuario
- `PUT /api/reviews/:id` → 403 si no pertenece al usuario
- `DELETE /api/reviews/:id` → 403 si no pertenece al usuario

## Seguridad y buenas prácticas
- `sessionStorage` es aceptable para esta práctica académica, pero vulnerable a XSS. En producción usar cookies `HttpOnly`, CSP y CSRF.
- Backend con `helmet`, `cors` restringido a `FRONTEND_ORIGIN`, `express-rate-limit`, validaciones y sanitización.

## Tests (Backend)
- Ejecutar: `cd backend && npm test`
- Cubre: login, rutas protegidas y que no se puede operar reseñas ajenas.

## Errores comunes y soluciones
- 401 Unauthorized en endpoints:
  - Solución: asegurarse de enviar `Authorization: Bearer <token>`; iniciar sesión en `/login`.
- 403 Forbidden al acceder/editar/eliminar reseñas:
  - Solución: estás intentando operar una reseña que no es tuya; usa una reseña creada por tu usuario.
- No puedo iniciar sesión:
  - Solución: ejecutar `cd backend && npm run seed` para crear usuarios demo; verificar `MONGO_URI` y que MongoDB esté corriendo.
- Error de conexión a MongoDB:
  - Solución: validar `MONGO_URI` en `.env`; si usas Compass, pegar la cadena correcta; reiniciar backend.
- CORS bloquea llamadas del frontend:
  - Solución: confirmar `FRONTEND_ORIGIN=http://localhost:3000` en `.env` del backend; reiniciar backend.
- Puerto en uso (3000 o 4000):
  - Solución: cerrar procesos previos o cambiar puertos en `.env` y scripts.
- Node versión incompatible:
  - Solución: usar Node 18+ (`node -v`).

## Publicar en GitHub (entrega)
1. Inicializar y subir:
   - `git init`
   - `git add .`
   - `git commit -m "feat: TasteFlow full stack"`
   - `git branch -M main`
   - `git remote add origin <URL_DEL_REPO>`
   - `git push -u origin main`
2. Versionar y release:
   - `git tag v1.0.0`
   - `git push --tags`
   - Crear Release en GitHub adjuntando el ZIP (sin `node_modules`, `.env`, builds de producción opcionales).

## Notas de entrega
- No subir `node_modules`, `.env`, `dist`, `build`, `.cache`, `.vite`.
- Proyectos separados en `frontend/` y `backend/`.