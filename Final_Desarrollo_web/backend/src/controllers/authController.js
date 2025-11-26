import { User } from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, message: 'Validation error', errors: errors.array() })
    }
    const { name, email, password } = req.body
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ status: 409, message: 'Email already in use' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })
    return res.status(201).json({ status: 201, message: 'Registered', user: { id: user._id, name: user.name, email: user.email } })
  } catch (e) {
    next(e)
  }
}

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, message: 'Validation error', errors: errors.array() })
    }
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ status: 401, message: 'Invalid credentials' })
    }
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ status: 401, message: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' })
    return res.status(200).json({ status: 200, message: 'Logged in', token, userId: String(user._id), user: { id: user._id, name: user.name, email: user.email } })
  } catch (e) {
    next(e)
  }
}