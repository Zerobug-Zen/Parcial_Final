import { Router } from 'express'
import { register, login } from '../controllers/authController.js'
import { body } from 'express-validator'

const router = Router()

router.post(
  '/register',
  [
    body('name').isString().isLength({ min: 2 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
  ],
  register
)

router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 })],
  login
)

export default router