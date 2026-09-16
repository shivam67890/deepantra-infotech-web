import nodemailer from 'nodemailer';

// Built lazily (on first actual send) rather than at import time — this
// guarantees process.env.EMAIL_USER/EMAIL_APP_PASSWORD are already loaded
// no matter what order modules get imported in elsewhere.
let transporter = null
function getTransporter() {
  if (!transporter) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      throw new Error(
        'EMAIL_USER / EMAIL_APP_PASSWORD are not set. Add them to server/.env (see .env.example).'
      )
    }
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })
  }
  return transporter
}

async function send({ to, subject, html }) {
  await getTransporter().sendMail({
    from: `"Deepantra Infotech" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  })
}

export function sendOtpEmail(to, otp, purpose = 'verify your account') {
  return send({
    to,
    subject: 'Your Deepantra Infotech verification code',
    html: `
      <div style="font-family:sans-serif;max-width:420px;margin:auto">
        <h2 style="color:#D9932C">Deepantra Infotech</h2>
        <p>Use the code below to ${purpose}. It expires in 10 minutes.</p>
        <p style="font-size:28px;font-weight:700;letter-spacing:6px">${otp}</p>
        <p style="color:#777;font-size:13px">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  })
}

export function sendDemoConfirmationEmail(to, organization) {
  return send({
    to,
    subject: 'We received your demo request — Deepantra Infotech',
    html: `
      <div style="font-family:sans-serif;max-width:420px;margin:auto">
        <h2 style="color:#D9932C">Deepantra Infotech</h2>
        <p>Thanks for requesting a free demo for <strong>${organization}</strong>.</p>
        <p>Our team will reach out shortly to schedule your session.</p>
        <p style="color:#777;font-size:13px">Illuminating minds, engineering the future.</p>
      </div>
    `,
  })
}

export function sendDemoNotificationToBusiness(to, booking) {
  return send({
    to,
    subject: `New demo request: ${booking.organization}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h3>New Demo Booking</h3>
        <p><strong>Organization:</strong> ${booking.organization}</p>
        <p><strong>Contact:</strong> ${booking.contactPerson}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Message:</strong> ${booking.message || '—'}</p>
      </div>
    `,
  })
}