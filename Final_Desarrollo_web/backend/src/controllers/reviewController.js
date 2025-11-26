import { Review } from '../models/Review.js'
import { validationResult } from 'express-validator'

export const getAll = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.user.id }).sort({ createdAt: -1 })
    return res.status(200).json({ status: 200, data: reviews })
  } catch (e) {
    next(e)
  }
}

export const createOne = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, message: 'Validation error', errors: errors.array() })
    }
    const payload = { ...req.body, userId: req.user.id }
    const review = await Review.create(payload)
    return res.status(201).json({ status: 201, data: review })
  } catch (e) {
    next(e)
  }
}

export const getOne = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({ status: 404, message: 'Not found' })
    }
    if (String(review.userId) !== String(req.user.id)) {
      return res.status(403).json({ status: 403, message: 'Forbidden' })
    }
    return res.status(200).json({ status: 200, data: review })
  } catch (e) {
    next(e)
  }
}

export const updateOne = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({ status: 404, message: 'Not found' })
    }
    if (String(review.userId) !== String(req.user.id)) {
      return res.status(403).json({ status: 403, message: 'Forbidden' })
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, message: 'Validation error', errors: errors.array() })
    }
    review.restaurantName = req.body.restaurantName ?? review.restaurantName
    review.rating = req.body.rating ?? review.rating
    review.visitDate = req.body.visitDate ?? review.visitDate
    review.comments = req.body.comments ?? review.comments
    await review.save()
    return res.status(200).json({ status: 200, data: review })
  } catch (e) {
    next(e)
  }
}

export const deleteOne = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({ status: 404, message: 'Not found' })
    }
    if (String(review.userId) !== String(req.user.id)) {
      return res.status(403).json({ status: 403, message: 'Forbidden' })
    }
    await review.deleteOne()
    return res.status(200).json({ status: 200, message: 'Deleted' })
  } catch (e) {
    next(e)
  }
}