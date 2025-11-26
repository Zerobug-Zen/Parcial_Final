import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const parts = header.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ status: 401, message: 'Unauthorized' })
  }
  const token = parts[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id }
    next()
  } catch (e) {
    return res.status(401).json({ status: 401, message: 'Invalid token' })
  }
}