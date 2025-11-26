import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from '../src/models/User.js'
import { Review } from '../src/models/Review.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/reviewsdb'

async function run() {
  await mongoose.connect(MONGO_URI)
  await User.deleteMany({})
  await Review.deleteMany({})
  const pass = await bcrypt.hash('secret123', 10)
  const u1 = await User.create({ name: 'Demo One', email: 'demo1@example.com', password: pass })
  const u2 = await User.create({ name: 'Demo Two', email: 'demo2@example.com', password: pass })
  await Review.create({ restaurantName: 'Coral Bay', rating: 4, visitDate: new Date(), comments: 'Great', userId: u1._id })
  await Review.create({ restaurantName: 'Turquoise Grill', rating: 5, visitDate: new Date(), comments: 'Excellent', userId: u1._id })
  await Review.create({ restaurantName: 'Petroleo Azul', rating: 3, visitDate: new Date(), comments: 'Good', userId: u2._id })
  await mongoose.connection.close()
}

run().then(() => {
  process.exit(0)
})