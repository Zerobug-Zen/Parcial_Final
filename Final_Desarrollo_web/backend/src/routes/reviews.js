import { Router } from 'express'
import { auth } from '../middlewares/auth.js'
import { getAll, createOne, getOne, updateOne, deleteOne } from '../controllers/reviewController.js'
import { body } from 'express-validator'

const router = Router()

router.get('/', auth, getAll)

router.post(
  '/',
  auth,
  [
    body('restaurantName').isString().isLength({ min: 2 }).trim().escape(),
    body('rating').isInt({ min: 0, max: 5 }).toInt(),
    body('visitDate').isISO8601().toDate(),
    body('comments').optional().isString().trim().escape()
  ],
  createOne
)

router.get('/:id', auth, getOne)

router.put(
  '/:id',
  auth,
  [
    body('restaurantName').optional().isString().isLength({ min: 2 }).trim().escape(),
    body('rating').optional().isInt({ min: 0, max: 5 }).toInt(),
    body('visitDate').optional().isISO8601().toDate(),
    body('comments').optional().isString().trim().escape()
  ],
  updateOne
)

router.delete('/:id', auth, deleteOne)

export default router