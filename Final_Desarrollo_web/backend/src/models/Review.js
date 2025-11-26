import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    visitDate: { type: Date, required: true },
    comments: { type: String, default: '', trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

export const Review = mongoose.model('Review', reviewSchema)