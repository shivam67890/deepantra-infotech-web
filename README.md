# Deepantra Infotech — Website

Full-stack website: React (Vite) frontend + Express/MongoDB backend, with
email+phone signup, OTP email verification, JWT login, forgot/reset
password, and a "Book a Free Demo" form that saves to the database and
emails a confirmation.

## Project structure

Both live in one folder — `server/` is nested inside the project root:

```
future-minds-website/          ← FRONTEND (root)
├── index.html
├── package.json
├── vite.config.js
├── .env.example                → copy to .env, set VITE_API_URL
├── public/assets/logo.jpeg      your logo
└── src/
    ├── main.jsx, App.jsx
    ├── api/client.js            → talks to the backend
    ├── context/
    │   ├── AuthContext.jsx      → logged-in user + JWT, saved in localStorage
    │   └── ThemeContext.jsx     → dark/light toggle, saved in localStorage
    ├── components/
    │   ├── Navbar.jsx/.css      → logo, links, Login/Signup, theme toggle
    │   ├── Footer.jsx/.css
    │   └── ImageCarousel.jsx/.css → react-slick homepage gallery
    ├── pages/
    │   ├── Home.jsx/.css
    │   ├── Programs.jsx/.css
    │   ├── Contact.jsx/.css     → Book a Free Demo form
    │   ├── Login.jsx
    │   ├── Signup.jsx           → details step → OTP step
    │   ├── ForgotPassword.jsx   → request step → reset step
    │   ├── Auth.css             → shared styles for the 3 auth pages
    │   └── NotFound.jsx
    └── styles/variables.css     → color tokens, light/dark theme values

└── server/                      ← BACKEND (nested inside the root above)
    ├── server.js
    ├── package.json
    ├── .env.example              → copy to .env, fill in real values
    └── src/
        ├── config/db.js          → MongoDB connection
        ├── models/User.js
        ├── models/DemoBooking.js
        ├── middleware/auth.js    → JWT route protection
        ├── utils/otp.js, token.js, sendEmail.js
        ├── controllers/authController.js
        ├── controllers/demoController.js
        └── routes/authRoutes.js, demoRoutes.js
```

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:
- **MONGO_URI** — create a free MongoDB Atlas cluster (mongodb.com/atlas), then
  Database → Connect → Drivers, and paste the connection string in. Replace
  `<username>`/`<password>` with a database user you create there.
- **JWT_SECRET** — any long random string (e.g. generate one at
  randomkeygen.com).
- **EMAIL_USER** / **EMAIL_APP_PASSWORD** — since you're using Gmail
  (deepantrainfotech@gmail.com), you cannot use your normal password for
  SMTP. Go to your Google Account → Security → turn on 2-Step Verification
  → App Passwords → generate one for "Mail" → paste the 16-character code
  here.

Run it:
```bash
npm run dev
```
You should see `MongoDB connected` and `Server running on http://localhost:5000`.

## 2. Frontend setup

```bash
# from the project root, a separate terminal
npm install
cp .env.example .env
npm run dev
```
Opens on `http://localhost:5173`. It talks to the backend at the URL in `.env`.

## 3. Test the flow

1. Go to `/signup`, fill the form → check the inbox for the email you signed
   up with → you'll get a 6-digit OTP → enter it → you're logged in.
2. Go to `/contact`, submit the demo form → check MongoDB Atlas (Browse
   Collections) for a new `demobookings` document, and check your inbox for
   the confirmation email.
3. Go to `/forgot-password` to test the reset flow.

## Notes on phone OTP

Right now, OTPs are sent by **email only** (phone number is stored and used
as an alternate login identifier, but SMS OTP isn't wired up — that needs a
paid SMS provider like Twilio, MSG91, or Fast2SMS, which requires an account
and per-message cost). If you want SMS OTP too, tell me which provider you'd
like to use in your region and I'll wire it into `verifyOtp`/`resendOtp`.

## Deployment (when you're ready)

- Backend: Render, Railway, or Fly.io (all have free tiers) — set the same
  env vars there.
- Frontend: Vercel or Netlify — set `VITE_API_URL` to your deployed backend
  URL.
- Update `CLIENT_ORIGIN` in the backend `.env` to your deployed frontend URL
  so CORS allows it.
