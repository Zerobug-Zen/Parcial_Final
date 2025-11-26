import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import reviewRoutes from './routes/reviews.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()

const app = express()

// Configuración CORS
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000'
app.use(cors({ origin: allowedOrigin }))

// Seguridad y parsing
app.use(helmet())
app.use(express.json())

// Rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use(limiter)

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/reviews', reviewRoutes)

// Middleware de errores
app.use(errorHandler)

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/reviewsdb'

// Conexión a MongoDB e inicio del servidor
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✅ Conexión a MongoDB exitosa')

      app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${PORT}`)
      })
    })
    .catch((err) => {
      console.error('❌ Error conectando a MongoDB:', err.message)
      process.exit(1)
    })
}

export default app
