import DemoBooking from '../models/DemoBooking.js'
import { sendDemoConfirmationEmail, sendDemoNotificationToBusiness } from '../utils/sendEmail.js'

// POST /api/demo
export async function bookDemo(req, res) {
  try {
    const { organization, contactPerson, phone, email, message } = req.body
    if (!organization || !contactPerson || !phone || !email) {
      return res.status(400).json({ message: 'Organization, contact person, phone and email are required.' })
    }

    const booking = await DemoBooking.create({ organization, contactPerson, phone, email, message })

    // Best-effort emails — booking is already saved even if these fail
    try {
      await sendDemoConfirmationEmail(email, organization)
      await sendDemoNotificationToBusiness(process.env.BUSINESS_NOTIFY_EMAIL, booking)
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr.message)
    }

    res.status(201).json({ message: 'Demo request received.', booking })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not submit your request. Please try again.' })
  }
}

// GET /api/demo — list bookings (protect this route with auth + an admin check in production)
export async function listDemoBookings(req, res) {
  try {
    const bookings = await DemoBooking.find().sort({ createdAt: -1 })
    res.json({ bookings })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not fetch bookings.' })
  }
}
