// Generates a 6-digit numeric OTP as a string, e.g. "042917"
export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export function otpExpiry(minutes = 10) {
  return new Date(Date.now() + minutes * 60 * 1000)
}
