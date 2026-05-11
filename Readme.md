# GyaanVerse_LMS

Full-stack learning management system (LMS) with a React (Vite) client and a Node.js/Express server.

## Highlights
- Student and educator experiences with role-based access
- Course browsing, details, and video playback
- Educator dashboards and course management
- Authentication via Clerk and protected routes
- Media uploads using Multer + Cloudinary
- Payments with Stripe (webhook-driven enrollment)

## Tech Stack
- Client: React, Vite, Tailwind CSS
- Server: Node.js, Express, MongoDB, Mongoose
- Auth: Clerk
- Payments: Stripe
- Uploads: Multer, Cloudinary

## Project Structure
```
Lms_v2/
  client/   # React app (Vite)
  server/   # Express API
```

## Getting Started

### 1) Prerequisites
- Node.js 18+ recommended
- MongoDB connection string
- Clerk application (publishable key + webhook secret)
- Cloudinary account
- Stripe account (secret key + webhook secret)

### 2) Install dependencies
```bash
cd client
npm install

cd ../server
npm install
```


### 4) Run the apps
```bash
# terminal 1
cd server
npm run server

# terminal 2
cd client
npm run dev
```

Client runs at `http://localhost:5173` by default. Server runs at `http://localhost:5000`.


## Scripts

### Client
- `npm run dev` - start Vite dev server
- `npm run build` - build for production
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

### Server
- `npm run server` - start server with nodemon
- `npm start` - start server
