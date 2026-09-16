import mongoose from 'mongoose'

const demoBookingSchema = new mongoose.Schema(
  {
    organization: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'scheduled', 'completed'],
      default: 'new',
    },
  },
  { timestamps: true }
)

export default mongoose.model('DemoBooking', demoBookingSchema)
