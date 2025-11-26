# TasteFlow — Frontend

Aplicación React + Bootstrap 5 para reseñas de restaurantes.

## Requisitos
- Node.js 18+
- Backend activo en `http://localhost:4000`

## Instalación y ejecución
1. Clonar el repositorio
2. Ir a `frontend/`
3. Instalar dependencias: `npm install`
4. Ejecutar en modo desarrollo: `npm start` (abre `http://localhost:3000`)
5. O construir y servir:
   - `npm run build`
   - `npx serve -s build -l 3000`

## Autenticación
- Iniciar sesión en `/login`.
- El token JWT se guarda en `sessionStorage` y se envía en `Authorization: Bearer <token>`.
- Las rutas están protegidas: sin token se redirige a `/login`.

## CRUD de reseñas
- Campos: Nombre del restaurante, Calificación (0–5), Fecha de la visita, Observaciones.
- Acciones: listar, crear, editar, eliminar. Solo se muestran las reseñas del usuario.

## Notas de seguridad
- `sessionStorage` es válido para esta práctica académica, pero puede exponer el token ante XSS. En producción usar cookies `HttpOnly`, CSP, y protección CSRF.

## Cómo iniciar sesión (no hay pantalla de registro)
- Antes de iniciar frontend, ejecutar el seed en el backend: `cd backend && npm run seed`.
- Credenciales demo:
  - `demo1@example.com` / `secret123`
  - `demo2@example.com` / `secret123`
- Abrir `http://localhost:3000/login`, autenticar y acceder a “Mis reseñas de restaurantes”.

## Errores comunes y soluciones
- Pantalla en blanco o redirección constante al login:
  - Verificar que el backend esté corriendo en `http://localhost:4000` y que el seed se haya ejecutado.
- 401 en llamadas del frontend:
  - Asegurarse de haber iniciado sesión; el token debe estar en `sessionStorage`.
- CORS bloqueado:
  - Revisar que `FRONTEND_ORIGIN` en `backend/.env` sea `http://localhost:3000`.
- Puerto 3000 ocupado:
  - Cerrar otros procesos en ese puerto o usar `serve -l 3001` y ajustar `FRONTEND_ORIGIN` si fuera necesario.